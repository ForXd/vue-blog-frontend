import R from './request';
function login(username, password) {
    return R.post('user/login', { username, password });
}
function logout() {
    return R.get('user/logout');
}
function register(username, password) {
    return R.post('user/register', { username, password });
}
export { login, logout, register };