import R from './request';


function getPostList(page) {
    return R.get(`article?page=${page}`);
}

function getPost(id) {
    return R.get(`article/${id}`);
}
export  { getPostList, getPost };