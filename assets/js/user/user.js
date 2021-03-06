var form = layui.form;


// 获取个人资料，并渲染在页面
function renderUser() {

    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (backData) {
            // console.log(backData);
            if (backData.status == 0) {
                form.val('abc', backData.data);
            }

        },

    });
}
$(function () {
    // 一进入到基本资料页面，就发送ajax请求，请求个人数据渲染到页面上
    renderUser();


    // 点击修改按钮，获取表单的值，发送ajax请求，更新用户信息，再发送ajax请求，修改个人信息
    $('.btn1').on('click', function (e) {
        e.preventDefault();
        var data = $('form').serialize();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: data,
            success: function (backData) {
                layer.msg(backData.message);
                window.parent.getUserInfo();
            },

        });
    })

    //点击重置按钮，
    $('.btn2').on('click', function (e) {
        e.preventDefault();
        // 获取用户个人信息，并渲染到页面，直接调用函数
        renderUser();
    })
})