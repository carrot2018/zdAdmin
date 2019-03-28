// 路由相关的代码
import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookie from 'js-cookie';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
      {
        path:'/',
        // component: resolve => require(['@/views/Home.vue'], resolve),
        component: () => import('./views/Home.vue'),
        meta: { requireAuth: true },
        children: [
          {
            path: '',
            redirect: '/news',
            meta: { requireAuth: true },
          },
          {
            path: 'news',
            // name: 'news',
            component: () => import('./views/News.vue'),
            meta: { requireAuth: true },
            children: [
              {
                path: '',
                redirect: '/news/newsadmin'
              },
              {
                path: 'newsadmin',
                name: 'newsadmin',
                component: () => import('./views/NewsAdmin.vue'),
                meta: { requireAuth: true },
              },
              {
                path: 'newsadd',
                name: 'newsadd',
                component: () => import('./views/NewsAdd.vue'),
                meta: { requireAuth: true },
              }
            ]
          },
          {
            path: 'banner',
            component: () => import('./views/Banner.vue'),
            children: [
              {
                path: '',
                redirect: '/banner/banneradmin',
                meta: { requireAuth: true },
              },
              {
                path: 'banneradmin',
                name: 'banneradmin',
                component: () => import('./views/BannerAdmin.vue'),
                meta: { requireAuth: true },
              },
              {
                path: 'banneradd',
                name: 'banneradd',
                component: () => import('./views/BannerAdd.vue'),
                meta: { requireAuth: true },
              }
            ]
          },
          
          {
            path: 'recruit',
            // name: 'recruit',
            component: () => import('./views/Recruit.vue'),
            children: [
              {
                path: '',
                redirect: '/recruit/recruitadmin',
                meta: { requireAuth: true },
              },
              {
                path: 'recruitadmin',
                name: 'recruitadmin',
                component: () => import('./views/RecruitAdmin.vue'),
                meta: { requireAuth: true },
              },
              {
                path: 'recruitadd',
                name: 'recruitadd',
                component: () => import('./views/RecruitAdd.vue'),
                meta: { requireAuth: true },
              },
              {
                path: 'recruitcheck/:newsId',
                name: 'recruitcheck',
                component: () => import('./views/RecruitCheck.vue'),
                meta: { requireAuth: true },
              }
            ]
          },
          {
            path: 'message',
            component: () => import('./views/Message.vue'),
            children: [
              {
                path: '',
                redirect: '/message/messageadmin',
                meta: { requireAuth: true },
              },
              {
                path: 'messageadmin',
                name: 'messageadmin',
                component: () => import('./views/MessageAdmin.vue'),
                meta: { requireAuth: true },
              },
              {
                path: 'messagedetails',
                name: 'messagedetails',
                component: () => import('./views/MessageDetails.vue'),
                meta: { requireAuth: true },
              },
              {
                path: 'messagecheck',
                name: 'messagecheck',
                component: () => import('./views/MessageCheck.vue'),
                meta: { requireAuth: true },
              }
            ]
          }
        ]
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('./views/login.vue'),
        meta: { requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: '*',
        redirect: '/news/newsadmin',
        // redirect: '/login'
      }
    ]
  // routes: [
  //     {
  //       path:'/',
  //       component: resolve => require(['@/views/Home.vue'], resolve),
  //       meta: { requireAuth: true },
  //       children: [
  //         {
  //           path: '',
  //           redirect: '/news',
  //           component: resolve => require(['@/views/News.vue'], resolve),
  //           meta: { requireAuth: true },
  //         },
  //         {
  //           path: 'news',
  //           // name: 'news',
  //           component: () => import('./views/News.vue'),
  //           meta: { requireAuth: true },
  //           children: [
  //             {
  //               path: '',
  //               redirect: '/news/newsadmin'
  //             },
  //             {
  //               path: 'newsadmin',
  //               name: 'newsadmin',
  //               component: () => import('./views/NewsAdmin.vue'),
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'newsadd',
  //               name: 'newsadd',
  //               component: () => import('./views/NewsAdd.vue'),
  //               meta: { requireAuth: true },
  //             }
  //           ]
  //         },
  //         {
  //           path: 'banner',
  //           component: () => import('./views/Banner.vue'),
  //           children: [
  //             {
  //               path: '',
  //               redirect: '/banner/banneradmin',
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'banneradmin',
  //               name: 'banneradmin',
  //               component: () => import('./views/BannerAdmin.vue'),
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'banneradd',
  //               name: 'banneradd',
  //               component: () => import('./views/BannerAdd.vue'),
  //               meta: { requireAuth: true },
  //             }
  //           ]
  //         },
          
  //         {
  //           path: 'recruit',
  //           // name: 'recruit',
  //           component: () => import('./views/Recruit.vue'),
  //           children: [
  //             {
  //               path: '',
  //               redirect: '/recruit/recruitadmin',
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'recruitadmin',
  //               name: 'recruitadmin',
  //               component: () => import('./views/RecruitAdmin.vue'),
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'recruitadd',
  //               name: 'recruitadd',
  //               component: () => import('./views/RecruitAdd.vue'),
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'recruitcheck/:newsId',
  //               name: 'recruitcheck',
  //               component: () => import('./views/RecruitCheck.vue'),
  //               meta: { requireAuth: true },
  //             }
  //           ]
  //         },
  //         {
  //           path: 'message',
  //           component: () => import('./views/Message.vue'),
  //           children: [
  //             {
  //               path: '',
  //               redirect: '/message/messageadmin',
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'messageadmin',
  //               name: 'messageadmin',
  //               component: () => import('./views/MessageAdmin.vue'),
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'messagedetails',
  //               name: 'messagedetails',
  //               component: () => import('./views/MessageDetails.vue'),
  //               meta: { requireAuth: true },
  //             },
  //             {
  //               path: 'messagecheck',
  //               name: 'messagecheck',
  //               component: () => import('./views/MessageCheck.vue'),
  //               meta: { requireAuth: true },
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       path: '/login',
  //       name: 'login',
  //       component: () => import('./views/login.vue'),
  //       meta: { requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
  //       }
  //     },
  //     {
  //       path: '*',
  //       redirect: '/news/newsadmin',
  //       // redirect: '/login'
  //     }
  //   ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { 
    //判断该路由是否需要登录权限
  let userName = Cookie.get('userName');
  if(userName) {
    //通过封装好的cookies读取token，如果存在，name接下一步如果不存在，那跳转回登录页
    next();//不要在next里面加"path:/",会陷入死循环
  } else {
    next({
      path: '/login',
      query: {redirect: to.fullPath} //将跳转的路由path作为参数，登录成功后跳转到该路由 
    });
  }
}else {
  next()
}
})


export default router;