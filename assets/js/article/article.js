$(function () {
    var form = layui.form;
    form.render('select'); // 加入这行，更新渲染下拉框
    // 设置请求参数
    var data = {
        pagenum: 1, // 页码 表示获取第一页的数据
        pagesize: 2,  // 每页显示多少条数据

    }
    // 封装一个函数，请求文章列表

    function renderArticle() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: data,
            success: function (res) {
                if (res.status === 0) {
                    // 调用模板引擎，渲染页面
                    var str = template('tpl-article', res);
                    $('tbody').html(str);

                    showPage(res.total);
                }
            }
        });
    }


    // 调用函数
    renderArticle();


    //------------分页------------
    // 加载laypage
    var laypage = layui.laypage;
    function showPage(num) {
        laypage.render({
            elem: 'page', //注意，这里的 page 是 ID，不用加 # 号
            count: num, //数据总数，从服务端得到
            limit: data.pagesize,
            limits: [2, 3, 5, 8],
            curr: data.pagenum,
            layout: ['limit', 'prev', 'page', 'next', 'skip', 'count'],
            jump: function (obj, first) {
                if (first === undefined) {
                    data.pagenum = obj.curr;
                    data.pagesize = obj.limit;
                    renderArticle();
                }

            }
        });
    };

    // 获取所有的分类
    $.ajax({
        type: 'get',
        url: '/my/article/cates',

        success: function (res) {
            var str = template('tpl-category', res);
            $('#category').html(str);
            form.render('select');
        }
    });


    $('#serch-form').on('submit', function (e) {
        e.preventDefault();
        var p = $(this).serializeArray();
        if (p[0].value) {
            data.cate_id = p[0].value;
        } else {
            delete data.cate_id;
        };

        if (p[1].value) {
            data.state = p[1].value;
        } else {
            delete data.state;
        }

        data.pagenum = 1;
        renderArticle();
    })
})