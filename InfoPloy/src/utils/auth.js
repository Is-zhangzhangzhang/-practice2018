/**
 * @file auth
 *
 * @author 张志杰 <zhangzhijie@atlasdata.com.cn>
 *     创建于 2018年05月03日
 *
 * @copyright (c) 2014-2018 海量云图（北京）数据技术有限公司
 */

const TokenKey = 'access-token';

export function getToken () {
    return window.sessionStorage.getItem(TokenKey);
}

export function setToken (token) {
    return window.sessionStorage.setItem(TokenKey, token);
}

export function removeToken () {
    return window.sessionStorage.removeItem(TokenKey);
}

