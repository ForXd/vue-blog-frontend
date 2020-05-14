import R from './request.js';

function createComment(comment) {
    return R.post('comment/', comment);
}
// 关于评论分页，由于评论存在树形结构，因此在分页的过程中可能无法显示树形结构
function getCommentbyPost(id) {
    return R.get(`comment/?postId=${encodeURIComponent(id)}`);
}
export { createComment, getCommentbyPost }