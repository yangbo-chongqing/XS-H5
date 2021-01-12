/**   
 * 接口统一管理
 */
import http from './http';
const api = {
    //旅游导图查询
    postMapDetails(params) {
        return http({
            method: 'post',
            url: '/api/web/map/details',
            data: params,
        });
    },
}
export default api;

