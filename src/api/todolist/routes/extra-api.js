module.exports = {
  routes: [
    {
      method: "GET",
      path: "/todolists/findTodolist/:page/:pageSize",
      handler: "todolist.findTodolist",
    },
    {
      method: "GET",
      path: "/todolists/findOneTodolist/:id",
      handler: "todolist.findOneTodolist",
    },
  ],
};
