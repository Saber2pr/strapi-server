"use strict";

/**
 * freq controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::freq.freq", ({ strapi }) => ({
  async find(ctx) {
    const response = await super.find(ctx);
    if (response && response.data && response.data.attributes) {
      return response.data.attributes.pairs;
    }
  },
}));
