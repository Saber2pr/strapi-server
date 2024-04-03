"use strict";

/**
 * todolist controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { v4: uuidv4 } = require("uuid");

module.exports = createCoreController(
  "api::todolist.todolist",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;

      if (!user) {
        ctx.send(
          {
            status: 401,
            message: "need login",
          },
          401
        );
        return;
      }

      const level = user.level;
      if (level >= 1) {
        // pro
      } else {
        const ownerCount = await strapi.entityService.count(
          "api::todolist.todolist",
          {
            filters: {
              ownerId: user.id,
            },
          }
        );
        if (ownerCount >= 5) {
          ctx.send(
            {
              status: 403,
              message:
                "Cloud storage free space limit reached, please upgrade pro.",
            },
            403
          );
          return;
        }
      }

      // @ts-ignore
      const body = ctx.request.body;

      if (body && body.data && user) {
        body.data.ownerId = user.id;
      }
      const result = await super.create(ctx);

      return result;
    },
    async update(ctx) {
      const user = ctx.state.user;

      // @ts-ignore
      const params = ctx.request.params;

      const shareId = /^share-/.test(params.id)
        ? params.id.replace(/^share-/, "")
        : null;

      if (shareId) {
        const response = await strapi.entityService.findMany(
          "api::todolist.todolist",
          {
            filters: {
              shareId: String(shareId),
            },
          }
        );
        const item = Array.isArray(response) ? response[0] : null;
        if (item && item.shareId === shareId) {
          // @ts-ignore
          const body = ctx.request.body;
          const res = await strapi.entityService.update(
            "api::todolist.todolist",
            item.id,
            {
              data: body?.data,
            }
          );
          return res;
        }
        ctx.send(
          {
            status: 404,
            message: "shareId not found",
          },
          404
        );
        return;
      }

      if (!user) {
        ctx.send(
          {
            status: 401,
            message: "need login",
          },
          401
        );
        return;
      }

      const response = await strapi.entityService.findOne(
        "api::todolist.todolist",
        params.id,
        {
          populate: "*",
        }
      );

      if (response && response.ownerId === user.id) {
        const result = await super.update(ctx);
        return result;
      }

      ctx.send(
        {
          status: 404,
          message: "not found",
        },
        404
      );
      return;
    },
    async findTodolist(ctx) {
      const user = ctx.state.user;
      if (!user) {
        ctx.send(
          {
            status: 401,
            message: "need login",
          },
          401
        );
        return;
      }

      // @ts-ignore
      const params = ctx.request.params;

      const page = params.page;
      const pageSize = params.pageSize;

      const response = await strapi.entityService.findPage(
        "api::todolist.todolist",
        {
          page,
          pageSize,
          filters: {
            ownerId: user.id,
          },
        }
      );

      return response;
    },
    async getShareId(ctx) {
      const user = ctx.state.user;

      if (!user) {
        ctx.send(
          {
            status: 401,
            message: "need login",
          },
          401
        );
        return;
      }

      // @ts-ignore
      const params = ctx.request.params;

      const response = await strapi.entityService.findOne(
        "api::todolist.todolist",
        params.id,
        {
          populate: "*",
        }
      );

      if (response && response.ownerId === user.id) {
        const uuid = uuidv4();
        await strapi.entityService.update(
          "api::todolist.todolist",
          response.id,
          {
            data: {
              shareId: uuid,
            },
          }
        );
        return { shareId: uuid };
      } else {
        ctx.send(
          {
            status: 404,
            message: "not found",
          },
          404
        );
        return;
      }
    },
    async findOneTodolist(ctx) {
      const user = ctx.state.user;

      // @ts-ignore
      const params = ctx.request.params;

      const shareId = /^share-/.test(params.id)
        ? params.id.replace(/^share-/, "")
        : null;

      if (shareId) {
        const response = await strapi.entityService.findMany(
          "api::todolist.todolist",
          {
            filters: {
              shareId: String(shareId),
            },
          }
        );
        const item = Array.isArray(response) ? response[0] : null;
        if (item && item.shareId === shareId) {
          return item;
        }
        return {
          id: -1,
        };
      }

      if (!user) {
        ctx.send(
          {
            status: 401,
            message: "need login",
          },
          401
        );
        return;
      }

      const response = await strapi.entityService.findOne(
        "api::todolist.todolist",
        params.id,
        {
          populate: "*",
        }
      );

      if (response && user) {
        if (response.ownerId === user.id) {
          return response;
        } else {
          ctx.send(
            {
              status: 403,
              message: "no access",
            },
            403
          );
          return;
        }
      } else {
        return {
          id: -1,
        };
      }
    },
  })
);
