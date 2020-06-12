$(function () {
    $.ajaxPrefilter(function (option) {
        //  option 就是ajax选项
        /* option={
        type:'get',
        url:"xxxx",
        ......
        } */

        option.url = 'http://www.liulongbin.top:3007' + option.url;

        option.complete = function (xhr) {
            // token可能会过期
            if (xhr.status === 1 && xhr.message === '身份认证失败！') {
                localStorage.removeItem('token');
                window.parent.location.href = "/login.html";
            }
        };
        option.headers = {
            'Authorization': localStorage.getItem('token')
        };
    });
})