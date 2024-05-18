'use strict';

/**
 * freq service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::freq.freq');
