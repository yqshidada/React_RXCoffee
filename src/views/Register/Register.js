import { Component } from 'react'

import logo from '../../images/home_active.png'

import './Register.css'

import Navbar from '../../components/Navbar/Navbar'
import Field from '../../components/Field/Field'

import Btn from '../../components/Btn/Btn'

import eye from '../../images/eye.png'
import openEye from '../../images/eye-open.png'

class LeftTitle extends Component {
  render() {
    return (
      <div className="n-left-title">
        <div className="login-logo">
          <img className="auto-img" src={logo} alt=""/>
        </div>
        <div className="login-text">Luckin Coffee</div>
      </div>
    );
  }
}

export default class Register extends Component {

  constructor() {
    super();
    this.state = {
      isPassword: true,

      //用户信息
      userInfo: {
        nickName: '',
        phone: '',
        password: ''
      }
    };
  }

  //注册
  register() {

    console.log('this.state.userInfo ==> ', this.state.userInfo);

    this.$axios({
      method: 'post',
      url: '/register',
      data: this.state.userInfo
    }).then(res => {
      console.log('res ==> ', res);

      //消息提示
      console.log(res.data.msg);

      //登录成功
      if (res.data.code === 100) {
        //跳转到登录
        this.props.history.push({pathname: '/login'});
      } 
      
    }).catch(err => {
      console.log('err ==> ', err);
    })
  }

  //切换密码显示状态
  togglePasswordStatus() {
    this.setState({
      isPassword: !this.state.isPassword
    })
  }

  goPage(pathname) {
    this.props.history.push({pathname});
  }

  //修改userInfo
  updateUserInfo(key, e) {
    this.state.userInfo[key] = e;
  }

  render() {
    return (
      <div className="login">
        <div className="nav-login-box">
          <Navbar clickRight={this.goPage.bind(this, '/menu')} leftTitle={<LeftTitle />} rightTitle={<div className="n-right-title">先逛一逛</div>}></Navbar>
        </div>
        <div className="login-info">
          <div className="login-info-title">
            <div className="zh-title">欢迎注册</div>
            <div className="en-title">Welcome to register</div>
          </div>
          <div className="login-form">
            <Field placeholder="输入手机号" title="手机号" value={this.state.userInfo.phone} changeValue={this.updateUserInfo.bind(this, 'phone')}></Field>
            <Field placeholder="输入密码" type={this.state.isPassword ? 'password' : 'text'} title="密码" rightIcon={this.state.isPassword ? eye : openEye} clickRightIcon={this.togglePasswordStatus.bind(this)} value={this.state.userInfo.password} changeValue={this.updateUserInfo.bind(this, 'password')}></Field>
            <Field placeholder="输入昵称" title="昵称" value={this.state.userInfo.nickName} changeValue={this.updateUserInfo.bind(this, 'nickName')}></Field>
          </div>

          <div className="login-btn-box">
            <Btn click={this.register.bind(this)} bgColor="#0C34BA" color="#fff" block round>注册</Btn>
          </div>

          <div className="register-btn-box">
            <Btn block round outline click={this.goPage.bind(this, '/login')}>登录</Btn>
          </div>
        </div>
      </div>
    )
  }
}
