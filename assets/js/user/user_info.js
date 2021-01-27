$(function () {
  let form = layui.form;

  //   =============================发送ajax请求 获得用户信息并给表单赋值=========================
  function getUserInfo() {
    axios
      .get("/my/userinfo", {
        // headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        // console.log(res.data.data);
        // 给表单赋值
        //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        form.val("formTest", res.data.data);
      });
  }

  getUserInfo();

  //   添加自定义校验规则
  form.verify({
    //对用户昵称做个长度限制
    nickname: function (value) {
      //   console.log(value);
      if (value.length > 6) {
        return "昵称长度需要在1-6个字符";
      }
    },
  });
  //   =================================修改用户信息,发送ajax请求 并且更新用户昵称和头像=============================
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    // 用户昵称不能大于6位
    // 收集表单数据
    let data = $(this).serialize();
    axios.post("/my/userinfo", data).then((res) => {
      if (res.data.status !== 0) {
        //更新失败
        return layer.msg("修改用户信息失败");
      }
      layer.msg("修改用户信息成功!");
      window.parent.getUserInfo();
    });
  });

  //   ============================重置功能====================
  $("#resetBtn").on("click", function (e) {
    e.preventDefault();
    getUserInfo();
  });
});
