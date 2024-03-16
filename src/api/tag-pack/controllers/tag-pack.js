"use strict";

/**
 * tag-pack controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::tag-pack.tag-pack",
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
      // @ts-ignore
      const body = ctx.request.body;
      if (body && body.data && user) {
        body.data.ownerId = user.id;
      }
      const result = await super.create(ctx);

      return result;
    },
  })
);
