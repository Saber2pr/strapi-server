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
      const body = ctx.request.body;

      if (body && body.data && user) {
        body.data.ownerId = user.id;
      }
      const result = await super.update(ctx);

      return result;
    },
    async findTodolist(ctx) {
      const user = ctx.state.user;

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
        return null;
      }
    },
  })
);
