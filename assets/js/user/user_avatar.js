$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 点击上传按钮实现上传文件功能
  $("#chooseImage").on("click", function () {
    // console.log(666);
    $("#file").click();
  });

  // 点击文件上传实现图片替换，使用change事件监听
  $("#file").on("change", function (e) {
    console.log(e);
    //   得到上传的图片文件
    var filelist = e.target.files;
    //   当用户选择的文件长度为0时，提示用户
    if (filelist.length === 0) {
      return layui.layer.msg("请选择图片再上传！");
    }
    //   拿到用户上传的图片
    var file = e.target.files[0];
    //   根据拿到的图片，创建一个URL地址
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 当点击确定按钮时，发起更换头像的请求
  $("#changeAvatar").click(function () {
    // 判断用户是否选择了sample.jpg
    var img = $("#image").prop("src");
    // console.log(img);
    if ($("#image").prop("src").includes("sample.jpg")) {
      return layui.layer.msg("请选择图片再上传！");
    }
    //   先将上传的图片转换为 base64格式的字符串
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    // 发起更换头像的请求
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: { avatar: dataURL },
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("更换头像失败！");
        }
        layui.layer.msg("更换头像成功！");
        window.parent.getUserInfo();
      },
    });
  });
});
