import R from './request.js';

function uploadAvatar(user_id, file) {
    return R.upload(`user/avatar/${user_id}`, file, 'avatar');
}


export { uploadAvatar };