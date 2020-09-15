// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，都会配置ajaxPrefilter对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  // 为需要请求头的ajax请求同意配置headers请求头
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }

  options.complete = function (res) {
    // console.log("执行了回调函数");
    // console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 1. 强制清空 token
      localStorage.removeItem("token");
      // 2. 强制跳转到登录页面
      location.href = "login.html";
    }
  };
});
