module.exports = async (policyContext, config, { strapi }) => {
  const id = policyContext.params.id;
  if (!id) {
    return false;
  }

  if (policyContext.state.user) {
    const user = policyContext.state.user;
    if (user) {
      const response = await strapi.entityService.findOne(
        "api::todolist.todolist",
        id,
        {
          populate: "*",
        }
      );
      if (response && response.ownerId === user.id) {
        return true;
      }
    }
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
