module.exports = ({ env: _env }) => {
  function env(key, defaultValue) {
    return _env(key, process.env[key] || defaultValue);
  }
  Object.assign(env, _env);
  env.int = _env.int;
  env.bool = _env.bool;

  return {
    auth: {
      secret: env("ADMIN_JWT_SECRET", process.env.ADMIN_JWT_SECRET),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT", process.env.API_TOKEN_SALT),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT", process.env.TRANSFER_TOKEN_SALT),
      },
    },
    flags: {
      nps: env.bool("FLAG_NPS", true),
      promoteEE: env.bool("FLAG_PROMOTE_EE", true),
    },
  };
};
