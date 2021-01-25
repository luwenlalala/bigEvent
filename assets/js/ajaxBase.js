// ajax的配置

// 设置根路径
axios.defaults.baseURL = "http://api-breakingnews-web.itheima.net";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // console.log(config);
    // 在发送请求之前做些什么
    //config 配置对象
    // console.log("发送axios请求前执行了该函数");

    // 来处理headers请求头, 带上token信息;
    // config.headers.Authorization = localStorage.getItem('token')

    // 将以上代码优化,以上代码无论哪个请求都会带上token信息,只需要在/my开头才需要带上token信息
    if(config.url.indexOf('/my') !== -1) {
      config.headers.Authorization = localStorage.getItem('token')

    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//  添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response);
    // 对响应数据做点什么
    if(response.data.status === 1 && response.data.message === '身份认证失败！') {
      //用户的身份认证失败
      localStorage.removeItem('token')
      location.href = '/home/login.html'
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
