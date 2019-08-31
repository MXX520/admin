import axios from 'axios'
// import { throwErr } from '@/utils' //utils 捕捉服务端http状态码的方法
import store from '@/store/index'   //引入vuex的相关操作
import { Message } from 'element-ui' //element Toast的提示
import router from '@/router/index'

//没有token跳转到登录页
if(!localStorage.getItem('token')){
  router.push({path:"/login"})
}
let httpPath = process.env.NODE_ENV == "development" ? 'http://39.100.65.236:8093/' : 'http://39.100.65.236:8093/';//'http://39.106.77.121:8086/';
//过滤请求--请求拦截器
axios.interceptors.request.use(config => {
  //config 为请求的一些配置 例如：请求头 请求时间 Token  可以根据自己的项目需求个性化配置，参考axios的中文说明手册  自己多动动手
  console.log(config.path)
  config.headers = {
    'token':localStorage.getItem('token'),
    "refreshToken":localStorage.getItem('refreshToken'),
    'Content-Type': 'application/json',
  }
  config.timeout = 10 * 1000 //请求响应时间
  return config
}, error => {
  return Promise.reject(error)
})



// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    console.log("拦截器成功",response);
    console.log("拦截器成功",response.data.code);
    if(response.data.code!="01"){
      Message.error(esponse.data.msg)
    }
    /*if(response.data.code=="401"){
      Message({
        message: 'token已过期',
        type: 'warning'
      });
      router.push({path:"/login"})
    }else if(response.data.code=="402"){
      Message({
        message: '缺少必要参数',
        type: 'warning'
      });
      router.push({path:"/login"})
    }else if(response.data.code=="404"){
      router.push({path:"/404"})
    }else if(response.data.code=="403"){
      Message({
        message: '无权访问',
        type: 'warning'
      });
      router.push({path:"/403"})
    }else if(response.data.code=="500"){
      router.push({path:"/500"})
    }else if(response.data.code=="06"){
      Message({
        message: '密码错误',
        type: 'warning'
      });
      console.log("d");
      return;
    }else if(response.data.code=="10"){
      router.push({path:"/login"})
      return;
    }*/
    return response;
  },
  error => {
    console.log("请求报错",error);
    return Promise.reject(error)
  }
)


// 封装请求
const api = {
  httpPath,
  /**
  * 封装get请求
  * @param url
  * @param data
  * @returns {Promise}
  */
  async get (url, data) {
    let urlPath = httpPath+url;
    try {
      let res = await axios.get(urlPath, {params: data})
      return new Promise((resolve) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          resolve(res)
        }
      })
    } catch (err) {
      alert('服务器出错1')
      console.log(err)
    }
  },

  /**
  * 封装post请求
  * @param url
  * @param data
  * @returns {Promise}
  */
  async post (url, data, config) {
    let urlPath = httpPath+url;
    console.log(urlPath);
    try {
      let res = await axios.post(urlPath, JSON.stringify(data))
      return new Promise((resolve, reject) => {
        console.log("请求成功");
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      return (e.message)
      alert('服务器出错2')
      console.log(err)
    }
  },

  /**
  * 封装put请求
  * @param url
  * @param data
  * @returns {Promise}
  */
  async put (url, data) {
    let urlPath = httpPath+url;
    console.log(urlPath);
    try {
      let res = await axios.put(urlPath, JSON.stringify(data))
      return new Promise((resolve, reject) => {
        console.log("请求成功");
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      return (e.message)
      alert('服务器出错2')
      console.log(err)
    }
  },


  /**
  * 封装patch请求
  * @param url
  * @param data
  * @returns {Promise}
  */

 async patch (url, data) {
  let urlPath = httpPath+url;
  console.log(urlPath);
  try {
    let res = await axios.patch(urlPath, JSON.stringify(data))
    return new Promise((resolve, reject) => {
      console.log("请求成功");
      if (res) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  } catch (err) {
    return (e.message)
    alert('服务器出错2')
    console.log(err)
  }
},

  /**
  * 封装delete请求
  * @param url
  * @param data
  * @returns {Promise}
  */

  async delete (url, data) {
    let urlPath = httpPath+url;
    console.log(urlPath);
    try {
      let res = await axios.delete(urlPath, JSON.stringify(data))
      return new Promise((resolve, reject) => {
        console.log("请求成功");
        if (res) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      return (e.message)
      alert('服务器出错2')
      console.log(err)
    }
  },

  download(url,data,name){
      let urlPath = httpPath+url;
      window.location.href = `${urlPath}?id=${data.id}&type=${data.type}`;
      return;
      axios.get(`${urlPath}?id=${data.id}&type=${data.type}`, {
              responseType: 'arraybuffer', // 或者responseType: 'blob'
              xsrfHeaderName: 'Authorization',
              headers
          }).then(res => {
              console.log("res",res);
              const blob = new Blob([res.data], {
                  type: 'application/vnd.ms-excel'
              })
              console.log("blob",blob);
              const objectUrl = URL.createObjectURL(blob)
              let link = document.createElement('a')
              link.style.display = 'none'
              link.href = objectUrl
              link.setAttribute('download',name)
              
              document.body.appendChild(link)
              link.click()
              // window.location.href = objectUrl
          }).catch(err => {
              console.log(err)
          })
  }
}
export default api;

