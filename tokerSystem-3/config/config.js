import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              name: 'login',
              path: '/user/login',
              component: './UserLogin',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/summsg', // authority: ['admin', 'user'],
            },
            {
              name: '信息总览',
              icon: 'smile',
              path: '/summsg',
              component: './Summsg',
            },
            {
              name: '订单管理',
              icon: 'smile',
              path: '/orderlist',
              component: './orderlist',
            },
            {
              name: '拼团管理',
              icon: 'smile',
              path: '/pingtuan',
              component: './pingtuan',
            },
            {
              name: '佣金管理',
              icon: 'smile',
              path: '/themoney',
              component: './themoney',
            },
            {
              name: '公文包',
              icon: 'smile',
              path: '/gongwenbao',
              routes: [
                {
                  name: '文件夹',
                  icon: 'smile',
                  path: '/gongwenbao/filestore',
                  component: './gongwenbao/fileStore',
                },
                {
                  name: '活动表单',
                  icon: 'smile',
                  path: '/gongwenbao/activestore',
                  component: './gongwenbao/activeStore',
                },
                {
                  name: '销售话术库',
                  icon: 'smile',
                  path: '/gongwenbao/sellstore',
                  component: './gongwenbao/sellStore',
                },
                {
                  name: '宣传海报',
                  icon: 'smile',
                  path: '/gongwenbao/poststore',
                  component: './gongwenbao/postStore',
                },
                {
                  name: '获客文章',
                  icon: 'smile',
                  path: '/gongwenbao/textstore',
                  component: './gongwenbao/textStore',
                },
              ],
            },
            {
              name: '客户管理',
              icon: 'smile',
              path: '/clientlist',
              component: './clientList',
            },
            {
              name: '员工',
              icon: 'smile',
              path: '/employee',
              component: './employee',
            },
            {
              name: '积分设置',
              icon: 'smile',
              path: '/itegration',
              component: './itegration',
            },
            {
              component: './404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  // manifest: {
  //   basePath: '/',
  // },
  // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/api/': {
  //     target: 'https://192.168.40.8:8443',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
};
