import router from './router';
import store from './store';
import iView from 'iview';
import { getToken } from '@/utils/auth'; // getToken from cookie

// permissiom judge function
function hasPermission (permissions, routeName) {
    return permissions.indexOf(routeName) >= 0;
}

const whiteList = ['/login'];// no redirect whitelist

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start(); // start progress bar
    if (to.path === '/login') {// 重新跳转到登录页面时清楚所有的弹出框
        iView.Modal.remove();
    }
    if (getToken()) { // determine if there has token
        /* has token*/
        if (to.path === '/login') {
            iView.LoadingBar.finish();
            next({ path: '/' }); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            if (store.getters.permissions.length === 0) { // 判断当前用户是否已拉取完权限信息
                store.dispatch('GetUserPermission').then(res => { // 拉取用户权限信息
                    const permissions = res;
                    if (permissions.length === 1) { // 因为默认是插入了index,所以应该是1
                        next({ path: '/401', replace: true, query: { noGoBack: true }});
                    }
                    store.dispatch('GenerateRoutes', { permissions }).then(() => { // 根据权限信息生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    });
                }).catch(() => {
                    store.dispatch('FedLogOut').then(() => {
                        iView.Message.error('验证失败，请重新登录');
                        iView.LoadingBar.finish();
                        next({ path: '/login' });
                    });
                });
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.permissions, to.name)) {
                    iView.LoadingBar.finish();
                    next();//
                } else {
                    iView.LoadingBar.finish();
                    next({ path: '/401', replace: true, query: { noGoBack: true }});
                }
                // 可删 ↑
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            iView.LoadingBar.finish(); // if current page is login will not trigger afterEach hook, so manually handle it
            next('/login'); // 否则全部重定向到登录页
        }
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish(); // finish progress bar
});
