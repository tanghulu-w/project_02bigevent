$(function () {
  var form = layui.form;
  // 增加表单验证功能
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 新密码的验证规则：新密码和旧密码不能相同
    newPwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return "新密码不能和旧密码相同！";
      }
    },
    // 确认新密码要和新密码相同
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次密码输入不一致！";
      }
    },
  });

  // 发起重置密码请求
  // 监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        layui.layer.msg(res.message);
        //   更改密码后重置表单
        $(".layui-form")[0].reset();
      },
    });
  });
});
