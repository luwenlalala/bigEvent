$(function(){
    // axios.get({/my/userinfo})

    $('#logout').click(function(){
        layer.msg('确定退出登录?', function(){
            localStorage.removeItem('token')
          }); 
    })
})