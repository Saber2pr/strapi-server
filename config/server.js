module.exports = ({ env: _env }) => {
  function env(key, defaultValue) {
    return _env(key, process.env[key] || defaultValue);
  }
  Object.assign(env, _env);
  env.int = _env.int;
  env.bool = _env.bool;
  env.array = _env.array;

  return {
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    app: {
      keys: env.array("APP_KEYS"),
    },
    webhooks: {
      populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
    },
  };
};
