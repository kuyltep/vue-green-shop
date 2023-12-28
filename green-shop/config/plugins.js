module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "sendgrid", // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "green-shop@strapi.io",
        defaultReplyTo: "green-shop@strapi.io",
        testAddress: "green-shop@strapi.io",
      },
    },
  },
  // ...
});
