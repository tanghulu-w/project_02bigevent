$(function () {
  getUserInfo();

  // 点击实现退出功能
  $(".tuichu").on("click", function () {
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (
      index
    ) {
      //1.清空本地存储里的token值
      localStorage.removeItem("token");
      // 2.退出当前页面，跳转到登录页面
      location.href = "login.html";
      // 关闭提示框
      layer.close(index);
    });
  });
});

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers 请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      renderAvatar(res.data);
    },
    // 不管请求失败还是成功都会执行的回调函数
    // complete: function (res) {
    //   console.log("执行了回调函数");
    //   console.log(res);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     // 1. 强制清空 token
    //     localStorage.removeItem("token");
    //     // 2. 强制跳转到登录页面
    //     location.href = "login.html";
    //   }
    //   renderAvatar(res.responseJSON.data);
    // },
  });
}

// 渲染用户头像
function renderAvatar(user) {
  // 渲染用户名，用户的昵称优先渲染
  var username = user.nickname || user.username;
  $(".welcome").html("欢迎&nbsp;&nbsp;&nbsp;" + username);
  // 渲染用户的头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").show().prop("src", user.user_pic);
    $(".text_avatar").hide();
  } else {
    var text = username[0].toUpperCase();
    $(".layui-nav-img").hide();
    $(".text_avatar").show().html(text);
  }
}
