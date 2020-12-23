/**   
 * 接口统一管理
 */
import http from './http';
const api = {
    //词条举报
    postReportAdd(params) {
        return http({
            method: 'post',
            url: '/api/store/report/add',
            data: params,
        });
    },
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
    //产品详情
    postDetails(params) {
        return http({
            method: 'post',
            url: '/api/product/details',
            data: params,
        });
    },
    //词条列表
    postRelicsList(params) {
        return http({
            method: 'post',
            url: '/api/Home/RelicsList',
            data: params,
        });
    },
}
export default api;

