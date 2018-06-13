/**
 * @file api
 *
 * @author 张志杰 <zhangzhijie@atlasdata.com.cn>
 *     创建于 2018年05月03日
 *
 * @copyright (c) 2014-2018 海量云图（北京）数据技术有限公司
 */

import axios from 'axios';
import request from './request';
import {apiConfig} from './apiConfig';

/**
 * api的使用：
 * 已在src/main.js文件中以$api把api挂载在vue上，可直接通过vm.$api调用
 * 调用说明，api实质上使用一个函数对象，调用方式
 * api[api的名称]({  // api的名称需要在src/utils/api/apiConfig.js文件中已定义的
 *  data: object || null, // 具体的参数
 *  cb: function, // 调用成功后的回调函数
 *  error: function, // 调用失败后的回调函数
 *  config: object  // axios其他一些的配置，注，不需要在config中指定url、method、data、params、responseType和cancelToken属性
 * })
 *  @example
 *  export default {
 *      data () {
 *          return {
 *          }
 *      },
 *      created () {
 *          let requestConfig = {};
 *          this.$api['code/list-types']({
 *              data: {type: 'dstype'}
 *              cb: res => {
 *                  console.log(res);
 *               },
 *               error: error => {
 *                   console.error(error);
 *               },
 *               config: requestConfig
 *           });
 *      }
 *  }
 */

const api = {};
apiConfig.forEach(config=>{
    let {name, method, responseType} = config;
    api[name] = ((name, method, responseType) => {
        return params => {
            let requestData = params.data || {};
            responseType = responseType || '';
            let requestConfig = params.config || {};
            requestConfig.url = 'index.php?r=' + name;
            requestConfig.method = method;
            requestConfig.params = requestData;
            requestConfig.responseType = responseType;
            if (method === 'post'){
                delete requestConfig.params;
                requestConfig.data = requestData;
            }
            return request(requestConfig).then(res => {
                params.cb(res);
            }, res => {
                if (params.error) {
                    if (axios.isCancel(res)){
                        return;
                    }
                    params.error(res);
                }
            });
        };
    })(name, method, responseType);
});

export default api;

