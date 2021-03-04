import Loadable from 'react-loadable';
import Loading from './Loading';
import permissions from "./permissions";

const routes = [
    {
        path: '/',
        component: Loadable({
            loader: () => import('../modules/home'),
            loading: Loading
        }),
        exact: true,
        title: '首页',
        icon: 'home',
        hideBreadcrumb: true
    }, {
        title: '个人中心',
        path: '/profile',
        component: Loadable({
            loader: () => import('../modules/profile'),
            loading: Loading
        }),
        hideOnMenu: true
    }, {
        path: '/transportOrder',
        title: '订单管理',
        icon: 'switcher',
        component: Loadable({
            loader: () => import('../modules/transportOrder'),
            loading: Loading
        })
    }, {
        path: '/feeDeclare',
        title: '费用申报',
        icon: 'solution',
        component: Loadable({
            loader: () => import('../modules/feeDeclare'),
            loading: Loading
        })
    }, {
        path: '/feeApproval',
        title: '费用审批',
        icon: 'solution',
        component: Loadable({
            loader: () => import('../modules/feeApproval'),
            loading: Loading
        }),
        authorize: {
            permissions: permissions.sysAdminManagement
        }
    }, {
        path: '/financialReport',
        title: '财务报表',
        icon: 'desktop',
        component: Loadable({
            loader: () => import('../modules/financialReport'),
            loading: Loading
        }),
        authorize: {
            permissions: permissions.sysAdminManagement
        }
    }, {
        path: '/client',
        title: '客户设置',
        icon: 'team',
        component: Loadable({
            loader: () => import('../modules/client'),
            loading: Loading
        })
    }, {
        path: '/carrier',
        title: '承运商设置',
        icon: 'deployment-unit',
        component: Loadable({
            loader: () => import('../modules/carrier'),
            loading: Loading
        })
    }, {
        path: '/nameProfile',
        title: '信息档案',
        icon: 'phone',
        component: Loadable({
            loader: () => import('../modules/nameProfile'),
            loading: Loading
        })
    }, {
        path: '/file',
        title: '文件管理',
        icon: 'folder',
        component: Loadable({
            loader: () => import('../modules/file'),
            loading: Loading
        })
    }, {
        path: '/user',
        title: '系统用户',
        icon: 'team',
        component: Loadable({
            loader: () => import('../modules/user'),
            loading: Loading
        }),
        authorize: {
            permissions: permissions.sysAdminManagement
        }
    }
];

export default routes;
