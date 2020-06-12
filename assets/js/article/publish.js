$(function () {
    var form = layui.form;
    form.render('select'); // 加入这行，更新渲染下拉框

    $.ajax({
        type: 'get',
        url: '/my/article/cates',

        success: function (res) {
            var str = template('tpl-category', res);
            $('select').html(str);
            form.render('select')

        }
    });

    /* 富文本编辑器替换内容区
    1、修改内容区的多行文本域的name换成content
    
    */
    initEditor();


    // 图片处理
    // 1 实现基本的剪裁效果
    // 2.

    // 1.1 初始化剪裁区域
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);
    $('.img-btn').click(function () {
        $('#file').click();
    });
    $('#file').change(function () {
        var fileObj = this.files[0];
        var url = URL.createObjectURL(fileObj);
        $image.cropper('destroy').attr('src', url).cropper(options);
    })


    /* 两个按钮都可以造成表单提交 */
    var s = '';
    $('button:contains("存为草稿")').click(function () {
        s = '草稿';
    })

    $('button:contains("发布")').click(function () {
        s = '已发布';
    });



    /* 实现文章发布  */
    $('form').submit(function (e) {
        e.preventDefault();
        // 收集表单各项数据

        // ajax提交给接口
        // 添加成功后，跳转到文章列表页
        var data = new FormData(this);

        data.append('state', s); // 追加参数state

        // 剪裁图片，得到canvas画布
        var canvas = $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        })
            .toBlob(function (blob) {
                data.append('cover_img', blob)
                for (var ele of data) {
                    console.log(ele);
                }

                $.ajax({
                    type: 'POST',
                    url: '/my/article/add',
                    // 提交formData 对象，必须指定两个false
                    contentType: false,
                    processData: false,
                    data: data,

                    success: function (res) {
                        layer.msg(res.message);
                        if (res.status === 0) {
                            location.href = '/article/article.html';
                        };
                    }
                });

            });

    })
})