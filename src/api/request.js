const PREFIX = 'http://localhost:8000/'
export default {
    get(url) {
        return fetch(PREFIX + url).then(res => res.json());
    },
    getFile(url) {
        return fetch(PREFIX + url);
    },
    post(url, data) {
        return fetch(PREFIX + url, {
            method: 'POST', // or 'PUT'
            // 问题的关键是设置了Content-Type之后，请求变为非简单请求，会先发送一条options请求
            // 后端需要将此请求的状态设为200才可以继续post,应该尽量避免非简单请求，会对服务器造
            // 成两倍的压力
            // headers: {
            //   'Content-Type': 'application/json',
            // },
            body: JSON.stringify(data), // data can be `string` or {object}!
        }).then(res => res.json())
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('post', PREFIX + url);
        //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        //     xhr.send(data);
        //     xhr.onreadystatechange = function() {
        //         if (xhr.readyState == 4) {
        //             if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        //                 resolve(xhr.response);
        //             } else {
        //                 reject(xhr.response);
        //             }
        //         }
        //     }
        // })
    },
    postData(url, data) {
        let formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        return fetch(PREFIX + url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
    },
    upload(url, files, filename) {
        let formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append(filename, file)
        })
        return fetch(PREFIX + url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
    }
}