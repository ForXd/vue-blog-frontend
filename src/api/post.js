import R from './request';

/**
 * 
 * @param {} page 
 * @returns 
 * {
 *  count: int,
 *  page: int,
 *  data: [
 *      {
 *           id: int,
 *           author: {name: string, avatar_url: string}
 *           title: string,
 *           description: string,
 *           category: string,
 *           praise_num: int,
 *           dislike_num: int,
 *           create_time: timestamp,
 *           content_url: string
 *      }
 *  ]
 * }
 * 
 * 
 */
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


