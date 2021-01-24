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

 /*  // 表单验证
  form.verify({

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  }); */

//   给表单注册提交事件
$('.regi form').on('submit',function(e){
    //阻止默认行为
    e.preventDefault()

    // 收集表单数据
   let data = $(this).serialize()
//    console.log(data);
    
axios.post('http://api-breakingnews-web.itheima.net/api/reguser',data).then(res => {
    console.log(res);
})
})
});
