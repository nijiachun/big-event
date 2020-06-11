$(function () {
    getUserInfo();

    // 退出功能
    $('#logout').click(function () {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})


function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status === 0) {
                // 设置欢迎词
                var myname = res.data.nickname || res.data.username;
                $('.myname').text(myname);
                // 设置头像
                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avater').hide();
                } else {
                    var t = myname.substr(0, 1).toUpperCase();
                    $('.text-avater').css('display', 'inline-block');
                    $('.text-avater').text(t);
                    $('.layui-nav-img').hide();
                }
            }
        },

    });
}