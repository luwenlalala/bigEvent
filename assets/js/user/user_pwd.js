$(function () {
  let form = layui.form;
  //进行密码校验
  form.verify({
     //判断原密码的值是否与新密码的值一致
     newPwd: function (value, item) {
       
        let oldPwd = $("#oldPwd").val();
   
        if (oldPwd === value) {
          return "新旧密码不能相同";
        }
        
      }, 

    //   判断两次输入的新密码是否一致
     rePwd: function (value, item) {
       
        let newPwd = $("#newPwd").val();
   
        if (newPwd !== value) {
          return "两次输入的密码不一致";
        }
        
      },  
    
     pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"] });

// =============================发送ajax请求 修改密码===========================
  //   收集表单数据 serialize
  $(".layui-form").on("submit", function (e) {
      e.preventDefault();
    let data = $(this).serialize();
    // console.log(data);
    axios.post('/my/updatepwd',data).then(res => {
        console.log(res);
        if(res.data.status !== 0) {
           return layer.msg(res.data.message)
        }
        layer.msg(res.data.message)
        //表单重置
        $(".layui-form")[0].reset()
    })
  });
});
