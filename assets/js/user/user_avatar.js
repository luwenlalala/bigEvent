$(function () {
  // ==============================裁剪区域======================
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $("#image");

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // ================================更换裁剪图片===========================
  // 1.拿到用户选择的文件
  //当文件域发生改变的时候就会触发change事件
  $("#file").on("change", function () {
    // console.log(11);

    let file = this.files[0];

    //如果file不存在,用户没有选择图片,后续操作不执行
    if(!file) {
        return
    }

    let newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

//   ==============================点击上传,模拟点击了文件域==================
  $("#uploadBtn").on("click", function () {
    $("#file").click();
  });

//   =============================点击确定,实现文件上传==================
  $("#sureBtn").on("click", function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      dataURL = encodeURIComponent(dataURL)
    axios.post("/my/update/avatar", 'avatar=' + dataURL).then((res) => {
      console.log(res);
    if(res.data.status !== 0) {
        return layer.msg('更新头像失败!')
    }
    layer.msg('更新头像成功!')
    window.parent.getUserInfo()
    });
  });
});
