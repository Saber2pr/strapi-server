"use strict";

/**
 * tag-pack router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::tag-pack.tag-pack", {
  config: {
    update: {
      policies: ["api::tag-pack.is-owner"],
    },
    delete: {
      policies: ["api::tag-pack.is-owner"],
    },
  },
});
