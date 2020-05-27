import R from './request';


function getPostList(page) {
    return R.get(`article?page=${encodeURIComponent(page)}`);
}

function getPost(id) {
    return R.get(`article/retrieve/${id}`);
}

function getPostListbyTitle(str) {
    return R.get(`article/search?val=${encodeURIComponent(str)}`);
}

function getCategory() {
    return R.get('article/category');
}

function createPost(post) {
    return R.post(`article/`, post);
}
export  { getPostList, getPost, getPostListbyTitle, createPost, getCategory };