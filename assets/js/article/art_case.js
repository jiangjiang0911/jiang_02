$(function () {
    var layer = layui.layer
    getArtList()
    function getArtList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                // layer.msg(res.message)
                var htmlStr = template('tpl-getArtList', res)
                $('tbody').html(htmlStr)
            }
        });
    }

    // 添加文章分类
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#addCate').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                layer.close(indexAdd)
                getArtList()

            }
        });

    })



    var indexEdit = null
    var form = layui.form
    $('tbody').on('click', '.btn-edit', function (e) {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '编辑文章分类',
            content: $('#editCate').html()
        });

        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({

            url: "/my/article/cates/" + id,

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)

                }
                form.val('form-edit', res.data)
            }
        });
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                layer.close(indexEdit)
                getArtList()

            }
        });

    })

    $('tbody').on('click', '.btn-del', function () {
        var id = $(this).attr('data-id')
        // console.log(id);
        layer.confirm('是否确定删除', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log(id);
            $.ajax({
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index);
                    getArtList()


                }
            });
        });

    })


})