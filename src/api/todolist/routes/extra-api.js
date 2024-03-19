module.exports = {
  routes: [
    {
      method: "GET",
      path: "/todolist/findTodolist/:page/:pageSize",
      handler: "todolist.addDownload",
    },
    {
      method: "GET",
      path: "/todolist/findOneTodolist/:id",
      handler: "todolist.findOneTodolist",
    },
  ],
};
