// 路由懒加载
const _import = file => () => import("@/views/" + file + "/" + file + ".vue");

// 路由配置表
const routes = [
  {
    path: "/",
    name: "home",
    component: _import("Home")
  },
  {
    path: "/about",
    name: "About",
    component: _import("About")
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: _import('index'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'all',
  //       component: _import('all')
  //     },
  //     // {
  //     //   path: '/list',
  //     //   name: 'list',
  //     //   component: _import('list')
  //     // },
  //     {
  //       path: '/all',
  //       name: 'all',
  //       component: _import('all')
  //     },
  //     {
  //       path: '/strategylist',
  //       name: 'strategylist',
  //       component: _import('strategy-list')
  //     },
  //     {
  //       path: '*',
  //       redirect: '/all'
  //     }
  //   ]
  // }
];

export default routes;
