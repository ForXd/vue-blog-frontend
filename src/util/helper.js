const convertToTree = (comments) => {
    let res = comments.filter(comment => {
        let children = comments.filter(item => item.to_comment == comment.id);
        if (children.length > 0) comment.children = children;
        return comment.to_comment == 0;
    })
    return res;
}

const timeFormat = (time) => {
    let now = Date.now();
    let prev = new Date(time);
    let diff = now - prev.getTime();

    let formatDate = function (val) {
        const padDate = function(val) {
            val = val < 10 ? '0' + val : val;
            return val;
        }
        let value=new Date(val);
        let year=value.getFullYear();
        let month=padDate(value.getMonth()+1);
        let day=padDate(value.getDate());
        let hour=padDate(value.getHours());
        let minutes=padDate(value.getMinutes());
        let seconds=padDate(value.getSeconds());
        return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
    }

    if (diff < 1000 * 60 * 5) {
        return '刚刚';
    } else if (diff >= 1000 * 60 * 5 && diff < 1000 * 60 * 60) {
        return `${Math.floor(diff / (1000 * 60))}分钟前`;
    } else if (diff >= 1000 * 60 * 60 && diff < 1000 * 60 * 60 * 24) {
        return `${Math.floor(diff / (1000 * 60 * 60))}小时前`;
    } else if (diff >= 1000 * 60 * 60 * 24 && diff < 1000 * 60 * 60 * 24 * 30) {
        return `${Math.floor(diff / (1000 * 60 * 60 * 24))}天前`;
    } else {
        return formatDate(time);
    }

}

export { convertToTree, timeFormat };