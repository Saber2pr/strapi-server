'use strict';

/**
 * strategy-product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::strategy-product.strategy-product', ({ strapi }) => ({
  async getStrategy(ctx) {
    const user = ctx.state.user;

    // @ts-ignore
    const params = ctx.request.params;

    const id = params.id
    if (!id) {
      ctx.send(
        {
          status: 400,
          message: "need id param",
        },
        400
      );
      return
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

    if (!user.paidProductIds) {
      ctx.send(
        {
          status: 404,
          message: "not found paid ids, need buy",
        },
        404
      );
      return
    }

    // verify user paids
    const paidProductIdsStr = user.paidProductIds || ''
    const paidProductIds = paidProductIdsStr.split(',').map(str => +str.trim())
    if (!paidProductIds.includes(+id)) {
      ctx.send(
        {
          status: 404,
          message: "not found, need buy",
        },
        404
      );
      return;
    }

    const response = await strapi.query("api::strategy-product.strategy-product").findOne(
      {
        where: {
          planId: +id
        },
        populate: true,
      },
    );

    if (!response) {
      ctx.send(
        {
          status: 404,
          message: "not found",
        },
        404
      );
      return
    }

    return response
  }
}));
