import { asyncRouterMap, constantRouterMap } from '@/router';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
function hasPermission (permissions, route) {
    if (route.name) {
        return permissions.indexOf(route.name) >= 0;
    } else {
        return false;
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissions
 */
function filterAsyncRouter (asyncRouterMap, permissions) {
    return asyncRouterMap.filter(route => {
        if (hasPermission(permissions, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, permissions);
            }
            return true;
        }
        return false;
    });
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes ({ commit }, data) {
            return new Promise(resolve => {
                const { permissions } = data;
                let accessedRouters = filterAsyncRouter(asyncRouterMap, permissions);
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            });
        }
    }
};

export default permission;
