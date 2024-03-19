"use strict";

/**
 * todolist router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::todolist.todolist", {
  config: {
    update: {
      policies: ["api::todolist.is-owner"],
    },
    delete: {
      policies: ["api::todolist.is-owner"],
    },
  },
});
