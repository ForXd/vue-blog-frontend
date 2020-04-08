import R from './request';

export default {
    login(username, password) {
        return R.post('user/login', { username, password });
    },
    logout() {
        return R.get('user/logout');
    },
    register(username, password) {
        return R.post('user/register', { username, password });
    }
}