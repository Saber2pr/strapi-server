'use strict';

/**
 * todolist service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todolist.todolist');
