/**   
 * 接口统一管理
 */
import http from './http';
const api = {
    //商户主页信息
    postMuseIndex(params) {
        return http({
            method: 'post',
            url: '/api/Home/MuseIndex',
            data: params,
        });
    },
    //词条详情
    postRelicsInfo(params) {
        return http({
            method: 'post',
            url: '/api/Home/RelicsInfo',
            data: params,
        });
    },
}
export default api;

