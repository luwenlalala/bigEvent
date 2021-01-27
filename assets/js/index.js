// =============================发送ajax请求获得用户信息===============================

  function getUserInfo(){

    axios
      .get("/my/userinfo", {
        // headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        // console.log(res);
  
        // 判断
        if (res.data.status !== 0) {
          // 获取用户信息失败
          return lay.msg("获取用户信息失败");
        }
  
        // 获取用户信息成功 ==> 处理头像和昵称
        avatarAndName(res.data);
      });
  }

  getUserInfo()

  function avatarAndName(res) {

    //如果有昵称则显示昵称.没有昵称,则显示usename 默认值 或运算
    let username = res.data.nickname || res.data.username;
    // console.log(username);
    $("#welcome").text("欢迎 " + username);

    //   判断有没有头像
    if (res.data.user_pic) {
      //如果有自己的头像,展示,隐藏文字头像
      $(".layui-nav-img").attr('src',res.data.user_pic).show();
      $(".text_avatar").hide();
    } else {
      //没有自己的头像,隐藏,展示文字头像
      $(".layui-nav-img").hide();
      
      // 文字头像的文字是名字的第一个字符的大写
      let first = username[0].toUpperCase()
      $(".text_avatar").text(first).show();
    }
  }

  // =======================================退出===========================================
  $("#logout").click(function () {
    layer.confirm(
      "确定退出登录?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 退出要做啥
        // 核心思路:和登录做的事情反过来
        //1.页面跳转到登录页面
        //2.将本地存储的token删除掉
        localStorage.removeItem("token");
        location.href = "/home/login.html";
        layer.close(index);
      }
    );
  });

