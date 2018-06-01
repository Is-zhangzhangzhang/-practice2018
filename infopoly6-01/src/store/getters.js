const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    status: state => state.user.status,
    permissions: state => state.user.permissions,
    menu: state => state.user.menu,
    buttons: state => state.user.buttons,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
};
export default getters;
