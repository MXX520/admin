import axios from 'axios'
// import { throwErr } from '@/utils' //utils 捕捉服务端http状态码的方法
import store from '@/store/index'   //引入vuex的相关操作
import { Message } from 'element-ui' //element Toast的提示
import router from '@/router/index'

let httpPath = 'http://39.100.65.236:8093/'


//过滤请求--请求拦截器
axios.interceptors.request.use(config => {
  //config 为请求的一些配置 例如：请求头 请求时间 Token  可以根据自己的项目需求个性化配置，参考axios的中文说明手册  自己多动动手
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
    console.log("拦截器成功",response.data.code);
    if(response.data.code=="401"){
      router.push({path:"/login"})
    }else if(response.data.code=="404"){
      router.push({path:"/404"})
    }else if(response.data.code=="403"){
      router.push({path:"/403"})
    }else if(response.data.code=="500"){
      router.push({path:"/500"})
    }if(response.data.code=="06"){
      Message({
        message: '密码错误',
        type: 'warning'
      });
      console.log("d");
      return;
    }
    return response;
  },
  error => {
    console.log("请求报错",error);
    return Promise.reject(error)
  }
)


// 封装请求
const api = {
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
  async post (url, data) {
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
 }
}
export default api;