var baseUrl = "http://api-breakingnews-web.itheima.net"

$.ajaxPrefilter(function (options) {
    // alert(options.url)

    options.url = baseUrl + options.url
    // alert(options.url)
})