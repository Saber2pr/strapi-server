module.exports = {
  routes: [
    {
      method: "GET",
      path: "/strategy-products/getStrategy/:id",
      handler: "strategy-product.getStrategy",
    }
  ],
};
