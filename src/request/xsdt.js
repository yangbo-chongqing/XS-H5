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
    //抖音分享信息
    postDouyin(params) {
        return http({
            method: 'post',
            url: '/api/web/douyin',
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
            url: '/api/web/flowing/details',
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
    //获取entryinfo 用户评论
    postComment(params) {
        return http({
            method: 'post',
            url: '/api/Home/RelicsCommentList',
            data: params,
        });
    },
    // 获取用户信息
    postUser(params) {
        return http({
            method: 'post',
            url: '/api/web/warrant ',
            data: params,
        });
    },
    // 词条点赞
    likeEntry(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/like',
            data: params,
        });
    },
    // 评论点赞
    commentLike(params) {
        return http({
            method: 'post',
            url: '/api/web/comment/like',
            data: params,
        });
    },
    // 用户评论词条
    CommentEntry(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/comment',
            data: params,
        });
    },
    // 图片上传
    UploadFile(params) {
        return http({
            method: 'post',
            url: '/api/UploadFile',
            data: params,
        });
    },
    //扫描统计
    ScanCode(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/scancode',
            data: params,
        });
    },
    //获取词条
    postEntry(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/list',
            data: params,
        });
    },
    //获取词条详情
    postEntryDetails(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/details',
            data: params,
        });
    },
    // web端图册详情
    getdetails(params) {
        return http({
            method: 'post',
            url: '/api/web/album/details',
            data: params,
        });
    },
    //修改词条详情
    modifyEntryDetails(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/edit',
            data: params,
        });
    },
    //发布词条详情
    addCreate(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/create',
            data: params,
        });
    },
    //获取用户轨迹
    postBehaviorTrack(params) {
        return http({
            method: 'post',
            url: '/api/web/user/track',
            data: params,
        });
    },
    //二维码请求
    postminicode(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/minicode',
            data: params,
        });
    },
    //获取订阅二维码
    postsubscribe(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/attention',
            data: params,
        });
    },
    // 取消订阅
    postunsubscribe(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/unsubscribe',
            data: params,
        });
    },
    //获取七牛云token
    postqiniu(params) {
        return http({
            method: 'post',
            url: '/api/qiniu',
            data: params,
        });
    },
    postrelated(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/related',
            data: params,
        });
    },
    //获取广告弹窗
    postadvertising(params) {
        return http({
            method: 'post',
            url: '/api/web/muse/advertising',
            data: params,
        });
    },
    // 订阅词条码(获取二维码)
    postattention(params) {
        return http({
            method: 'post',
            url: '/api/web/relics/attention',
            data: params,
        });
    },
    // web端扫码统计
    poststatistics(params) {
        return http({
            method: 'post',
            url: '/api/web/muse/statistics',
            data: params,
        });
    },
    // web工作台统计
    postworkbench(params) {
        return http({
            method: 'post',
            url: '/api/web/muse/workbench',
            data: params,
        });
    },

}
export default api;

