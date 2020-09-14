$(function () {
    // 点击去注册按钮，reg显示，login隐藏
    $("#link_login").on("click", function () {
      $(this).hide();
      $("#link_reg").show();
      $(".reg").show();
      $(".login").hide();
    });
    //  点击去登陆按钮，reg隐藏。login显示
    $("#link_reg").on("click", function () {
      $(this).hide();
      $("#link_login").show();
      $(".reg").hide();
      $(".login").show();
    });
  
    // 定义正则验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
      // 定义一个 pwd 的校验规则，验证密码框
      pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
      // 定义一个校验确认密码的规则
      repwd: function a(value) {
        // 先拿到密码框里的值
        // 让确认密码框里的值与密码框里的值比较
        // 两次值一致则登录，不一致return
        var val = $(".reg [name=pwd]").val();
        if (value !== val) {
          return "两次密码输入不一致";
        }
      },
    });
  
    // 监听注册表单的提交行为
    $("#reg_form").on("submit", function (e) {
      e.preventDefault();
      $.post(
        "/api/reguser",
        {
          username: $("#reg_form [name=username]").val(),
          password: $("#reg_form [name=pwd]").val(),
        },
        function (res) {
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg("请登录账号");
          $("#link_reg").click();
        }
      );
    });
  
    // 监听登录表单的提交行为
    $("#login_form").on("submit", function (e) {
      e.preventDefault();
      // 提交登录请求
      $.ajax({
        type: "POST",
        url: "/api/login",
        data: {
          username: $("#login_form [name=username]").val(),
          password: $("#login_form [name=pwd]").val(),
          // $(this).serialize()
        },
        success: function (res) {
          console.log(res);
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg("登录成功");
          // 将token值存储到本地存储内
          localStorage.setItem("token", res.token);
          location.href = "index.html";
        },
      });
    });
  });