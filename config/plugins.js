module.exports = ({ env: _env }) => {
  function env(key, defaultValue) {
    return _env(key, process.env[key] || defaultValue);
  }
  Object.assign(env, _env);
  env.int = _env.int;
  env.bool = _env.bool;

  return {
    email: {
      config: {
        provider: "nodemailer",
        providerOptions: {
          host: env("SMTP_HOST", "smtp.example.com"),
          port: env("SMTP_PORT", 587),
          auth: {
            user: env("SMTP_USERNAME"),
            pass: env("SMTP_PASSWORD"),
          },
        },
        settings: {
          defaultFrom: env("SMTP_DEFAULT_FROM"),
          defaultReplyTo: env("SMTP_DEFAULT_REPLY"),
        },
      },
    },
    "strapi-paypal": {
      enabled: true,
      config: {
        paypalSandBoxUrl:
          env("PAYPAL_SANDBOX_API_URL") || "https://api-m.sandbox.paypal.com",
        paypalLiveUrl: env("PAYPAL_LIVE_API_URL") || "https://api-m.paypal.com",
      },
    },
    "users-permissions": {
      config: {
        jwt: {
          expiresIn: "7d",
        },
      },
    },
  };
};
