import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'lib-flexible/flexible';

import axios from 'axios'

import {
  HashRouter
} from 'react-router-dom';

import cookies from 'react-cookies'

import {createRoute} from './route/createRoute'

axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log('config ==> ', config);

  let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

  if (config.method === 'get') {
    config.params = config.params || {};
    config.params.appkey = appkey;
  } else if (config.method === 'post') {
    config.data = config.data || {};
    // console.log('config.data ==> ', config.data);
    //将post请求的data参数进行序列化
    let dataParams = '';
    for (let key in config.data) {
      dataParams += `${key}=${config.data[key]}&`
    }

    dataParams += `appkey=${appkey}`;

    config.data = dataParams;

    // console.log('dataParams ==> ', dataParams);
  }

  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

Component.prototype.$createRoute = createRoute;

Component.prototype.$axios = axios;

Component.prototype.$cookies = cookies;

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);