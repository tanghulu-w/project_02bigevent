$(function () {
  var form = layui.form;
  // 对表单输入框进行验证
  form.verify({
    nickname: function (value) {
      if (value.length < 2 || value.length > 6) {
        return "昵称长度必须在2~6个字符之间！";
      }
    },
  });

  initUserInfo();
  // 初始化用户资料
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        //   快速填充表单的值
        form.val("formUser", res.data);
      },
    });
  }

  // 点击重置按钮时，让填写的内容回复到原始为更改的
  $("#btnReset").on("click", function (e) {
    // 阻止默认重置行为
    e.preventDefault();
    initUserInfo();
  });

  // 当点击提交修改按钮时，用户资料更新
  $("#form_user").on("submit", function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg("修改成功！");
        // 渲染用户个人中心信息和头像
        window.parent.getUserInfo();
      },
    });
  });
});
