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

      // @ts-ignore
      const body = ctx.request.body;
      if (body && body.data) {
        const putData = body.data;
        if ("private" in putData && user) {
          if (putData.private === true) {
            if (user.level === 0) {
              ctx.send(
                {
                  status: 403,
                  message: "Need upgrade pro",
                },
                403
              );
              return;
            }
          }
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
      const body = ctx.request.body;
      if (body && body.data) {
        const putData = body.data;
        if ("private" in putData && user) {
          if (putData.private === true) {
            if (user.level === 0) {
              ctx.send(
                {
                  status: 403,
                  message: "Need upgrade pro",
                },
                403
              );
              return;
            }
          }
        }
      }

      const result = await super.update(ctx);

      return result;
    },
    async addDownload(ctx) {
      // @ts-ignore
      const params = ctx.request.params;
      if (!params.id) {
        ctx.send(
          {
            status: 403,
            message: "need id",
          },
          403
        );
        return;
      }
      const response = await strapi.entityService.findOne(
        "api::tag-pack.tag-pack",
        params.id,
        {
          populate: "*",
        }
      );
      if (!response) {
        ctx.send(
          {
            status: 404,
            message: `id not found ${params.id}`,
          },
          404
        );
        return;
      }
      return await strapi.entityService.update(
        "api::tag-pack.tag-pack",
        response.id,
        {
          data: {
            downloads: response.downloads + 1,
          },
        }
      );
    },
  })
);
