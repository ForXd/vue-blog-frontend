import R from './request';

export default {
    getPostList(page) {
        return R.get(`article?page=${page}`);
    },
    getPost(id) {
        return R.get(`article/${id}`);
    }

}