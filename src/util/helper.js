const convertToTree = (comments) => {
    let res = comments.filter(comment => {
        let children = comments.filter(item => item.to_comment == comment.id);
        if (children.length > 0) comment.children = children;
        return comment.to_comment == 0;
    })
    return res;
}

export { convertToTree };