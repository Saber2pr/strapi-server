module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/tag-packs/tap-download/:id",
      handler: "tag-pack.addDownload",
      config: {
        auth: false,
      },
    },
  ],
};
