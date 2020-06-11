

function renderCategory() {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            var str = template('tpl-category', res);
            $('tbody').html(str);
        }
    });
}

var form = layui.form;
var addIndex;
var editIndex;
$(function () {
    // 分类查询，通过模板引擎渲染到页面
    renderCategory();


    //完成删除分类功能
    // 找到删除按钮，注册单击事件
    $('body').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something

            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,

                success: function (res) {
                    layer.msg(res.message);
                    if (res.status == 0) {
                        // 删除成功，重新渲染
                        renderCategory();
                    }
                }
            });
        });
    });

    // 完成添加功能
    // 1.出现弹窗
    $('.layui-card button').click(function () {
        addIndex = layer.open({
            title: '添加文章分类',
            type: 1,
            content: $('#add-category').html(),
            area: ['500px', '250px']
        });
    })

    // 2.监听添加类别的表单提交事件（动态生成的都需要委托注册）
    /* 1.阻止表单默认行为，发送ajax请求，新增数据 */
    $('body').on('submmit', '.add-form', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    layer.close(addIndex);
                    renderCategory();
                }
            }
        });
    })


    // 完成编辑功能
    // 1.点击编辑，出现弹窗
    $('body').on('click', '.edit', function () {
        var data = this.dataset;
        editIndex = layer.open({
            title: '修改文章分类',
            type: 1,
            content: $('#edit-category').html(),
            area: ['500px', '250px'],
            success: function () {

                form.val('edit-form', JSON.parse(JSON.stringify(data)));
            }
        });
    });

    $('body').on('submit', '.edit-form', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        data[0].name = "Id";
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    layer.close(editIndex);
                    renderCategory();
                }

            }
        });
    })
})