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
                layer.msg(res.message);
                if (res.status === 0) {
                    $('.register').hide().prev().show();
                }
            }
        });
    });

    // 注册的表单验证
    // 使用layui的内置模块，必须先加载
    var form = layui.form;
    form.verify({
        // 自定义验证规则
        // 键（验证规则）： 值（验证方法）
        // len: [/^[\S]{6,12}$/, '密码长度不对'] // 使用数值来验证
        len: function (val) {
            // val 表示使用该验证规则的输入框的值
            if (val.trim().length < 6 || val.trim().length > 12) {
                return "密码长度必须是6~12位,且不能有空格";
            }
        },
        same: function (val) {
            // val 表示重复密码的值
            var password = $('.pass').val(); // 第一个密码框的值
            if (password !== val) {
                return "两次密码不一致";
            }
        },

    })

    // -------------------------登录功能
    /* 1、监听登录表单的提交事件
    2、阻止默认行为
    3、ajax提交账号和密码
    4、根据服务器返回的结果
       4.1 如果登录成功，跳转到首页
       4.2 如果失败，给出提示
    */

    $('.login form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: "http://www.liulongbin.top:3007/api/login",
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    localStorage.setItem('token', res.token);
                    window.location.href = '/index.html'
                }
            }
        })
    })
});