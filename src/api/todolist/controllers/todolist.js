"use strict";

/**
 * todolist controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

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
      const body = ctx.request.body;

      if (body && body.data && user) {
        body.data.ownerId = user.id;
      }
      const result = await super.update(ctx);

      return result;
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
    async findOneTodolist(ctx) {
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
