$(function () {
    // 切换登录注册盒子
    $('#goto-reg').on('click', function () {
        $('.register').show().prev().hide();

    });

    $('#goto-login').on('click', function () {
        $('.login').show().next().hide();
    });

    // 表单提交事件
    // 阻止默认行为
    $('.register form').on('submit', function (e) {
        e.preventDefault();
        //serialize()
        var data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://www.liulongbin.top:3007/api/reguser",
            data: data,
            success: function (res) {
                alert(res.message);
                if (res.status === 0) {
                    $('.register').hide().prev().show();
                }
            }
        });
    })
});