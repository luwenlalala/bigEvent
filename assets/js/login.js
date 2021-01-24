$(function () {
  //点击去注册 显示注册界面
  $("#gotoRegi").click(function () {
    $(".regi").show();
    $(".login").hide();
  });

  // 点击去登陆 显示登录界面
  $("#gotoLogin").click(function () {
    $(".login").show();
    $(".regi").hide();
  });

  // 表单验证
  let form = layui.form;

  form.verify({
    //判断密码框的值是否与确认密码框的值一致
    repassword: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      // console.log(value);
      // 获取密码框的值
      let password = $(".regi [name=password]").val();
      //  console.log(password);

      if (password !== value) {
        // console.log('两次密码不一致');
        return "两次密码不一致";
      }
    },
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });

  //   给注册的表单注册提交事件
  $(".regi form").on("submit", function (e) {
    //阻止默认行为
    e.preventDefault();

    // 收集表单数据
    let data = $(this).serialize();
    // console.log(data);

    axios
      // .post("http://api-breakingnews-web.itheima.net/api/reguser", data)
      .post("/api/reguser", data)
      .then((res) => {
        // console.log(res);
        if (res.data.status !== 0) {
          return layer.msg(res.data.message);
        }
        layer.msg('注册成功,请登录');

        // 实现跳转
        $("#gotoLogin").click();
      });
  });

  //   给登录的表单注册提交事件
  $(".login form").on("submit", function (e) {
    //阻止默认行为
    e.preventDefault();

    // 收集表单数据
    let data = $(this).serialize();
    // console.log(data);

    axios
      // .post("http://api-breakingnews-web.itheima.net/api/login", data)
      // 设置了全局的axios默认值
      .post("/api/login", data)
      .then((res) => {
        console.log(res);
        if (res.data.status !== 0) {
          return layer.msg(res.data.message);
        }

        //需要把服务器响应回来的token信息(随机码)随身携带,方便后期使用token ===> 使用本地存储来存储token
        localStorage.setItem('token',res.data.token)

        layer.msg('登录成功,即将跳转去首页!',function(){

          // 实现跳转
          location.href = "/home/index.html";
        })

      });
  });
});
