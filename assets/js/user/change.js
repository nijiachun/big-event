$(function () {
    // 一 实现基本的剪裁
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 二 上传图片
    //点击上传按钮，触发文件域
    $('button:contains("上传")').on('click', function () {
        $('#file').click();
        // $('#file').trigger('click');
    });

    // 三 切换图片后，更换剪裁区图片
    $('#file').change(function () {
        var fileObj = this.files[0];
        var url = URL.createObjectURL(fileObj);
        $image.cropper('destroy').attr('src', url).cropper(options);
    });

    // 四 点击确定，剪裁图片，同时更换头像
    $('button:contains("确定")').click(function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png');

        $.ajax({
            type: 'post',
            url: '/my/update/avatar',

            data: { avatar: dataURL },
            success: function (backData) {
                layer.msg(backData.message);
                if (backData.staus == 0) {
                    window.parent.getUserInfo();
                }
            },
            // headers: {
            //     'Authorization': localStorage.getItem('token')
            // },
            // complete: function (xhr) {
            //     if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
            //         // 清楚过期的token或者无效的token
            //         localStorage.removeItem('token');
            //         // 跳转到登录页
            //         // window 表示当前的窗口，即repwd.html
            //         // window.parent 表示当前窗口的父窗口，即index.html
            //         window.parent.location.href = '/login.html';
            //     }
            // }
        });
    })
})