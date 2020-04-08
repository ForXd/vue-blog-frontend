const test_data = [
    {id:1,content:'1',author: 'zyx', to_comment: 0},
    {id:2,content:'2',author: 'zyx', to_comment: 1},
    {id:3,content:'3',author: 'zyx', to_comment: 2},
    {id:4,content:'4',author: 'zyx', to_comment: 2},
    {id:5,content:'5',author: 'zyx', to_comment: 0},
    {id:6,content:'6',author: 'zyx', to_comment: 3},
    {id:7,content:'7',author: 'zyx', to_comment: 6},
]

function convertToTree(data) {
    let res = data.filter(item => {
        let children = data.filter(d => d.to_comment == item.id);
        if (children.length > 0) item.children = children;
        return item.to_comment == 0;
    })
    return res;
}
export default convertToTree(test_data);