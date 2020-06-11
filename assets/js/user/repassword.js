$(function () {
    // 表单验证
    var form = layui.form;
    form.verify({
        len: [/^[\S]{6,12}$/, '长度必须在6~12位，且不能出现空格'],

        // 验证原密码和新密码不能相同
        diff: function (val) {
            //val 表示新密码
            var old = $('.old').val().trim();
            if (old === val) {
                return "新密码不能和原密码相同"
            }
        },
        same: function (val) {
            var newPass = $('.newPass').val().trim();
            if (newPass !== val) {
                return "两次密码不一致"
            }
        }
    })


    // 密码重置功能
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    $('form')[0].reset();// 需要转DOM对象
                }
            },
            // headers: {
            //     'Authorization': localStorage.getItem('token')
            // },
            // complete: function (xhr) {
            //     // token可能会过期
            //     if (xhr.status === 1 && xhr.message === '身份认证失败！') {
            //         localStorage.removeItem('token');
            //         window.parent.location.href = "/login.html";
            //     }
            // }

        });
    })
})