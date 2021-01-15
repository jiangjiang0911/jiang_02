$(function () {
    // console.log(111);

    //切换登陆注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })

    // 添加表单自定义验证
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须为6-16位，且不能输入空格'
        ],
        repwd: function (value) {
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 注册请求
    var layer = layui.layer
    $('#reg_form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 自动切换到登陆
                $('#link_login').click()
                // 重置表单信息
                $('#reg_form')[0].reset()
            }
        });
    })

    // 登陆请求
    $('#login_form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // 将登陆成功后的身份认证信息存到本地数据
                localStorage.setItem('token', res.token)
                // 登陆后跳转到首页
                location.href = '/index.html'

            }
        });
    })
})