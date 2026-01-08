// (function () {
//     const baseUrl = window.location.origin.replace('http://', 'https://'); // 获取当前页面的域名
//     const targetUrl = baseUrl + "/_tag.html";
//     const response = {
//         data: {
//             "type": "page",
//             "body": {
//                 "type": "iframe",
//                 "src": targetUrl
//             }
//         },
//         status: 0
//     }

//     window.jsonpCallback && window.jsonpCallback(response);
// })();

(function () {
    const baseUrl = window.location.origin.replace('http://', 'https://');
    const targetUrl = baseUrl + "/_tag.html";
    const response = {
        data: {
            "type": "page",
            "body": {
                "type": "iframe",
                "src": targetUrl,
                "height": 900, // 这里设置固定高度，单位默认为 px
                "className": "b-a" // 可选：加个边框方便观察
            }
        },
        status: 0
    }

    window.jsonpCallback && window.jsonpCallback(response);
})();