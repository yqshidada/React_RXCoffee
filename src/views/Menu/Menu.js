import { Component } from 'react'

import Search from '../../components/Search/Search'

import AsideMenu from '../../components/AsideMenu/AsideMenu'
import AsideMenuItem from '../../components/AsideMenuItem/AsideMenuItem'
import Product from '../../components/Product/Product'

import './Menu.css'

export default class Menu extends Component {

  constructor() {
    super();
    this.state = {
      menuData: [],

      menuActiveIndex: 0,

      //商品数据
      productData: []
    }
  }

  componentDidMount() {
    this.getAsideMenuData();
  }

  //获取菜单类型数据
  getAsideMenuData() {
    this.$axios({
      method: 'get',
      url: '/type'
    }).then(res => {
      console.log('res ==> ', res);
      if (res.data.code === 400) {
        res.data.result.unshift({type: 'isHot', typeDesc: '热卖推荐'});
        this.setState({
          menuData: res.data.result
        })

        this.getProductByType(this.state.menuActiveIndex);
      }
    }).catch(err => {
      console.log('err ==> ', err);
    })
  }

  //创建AsideMenuItem的列表
  createAsideMenuItemList() {
    return this.state.menuData.map((v, i) => <AsideMenuItem key={i} type={v.type}>{v.typeDesc}</AsideMenuItem>);
  }

  //根据商品类型获取商品数据
  getProductByType(index) {

    //获取本地缓存数据
    let localCacheData = localStorage.getItem('typeProduct');
    
    if (!localCacheData) {
      localCacheData = {};
    } else {
      localCacheData = JSON.parse(localCacheData);
    }

    console.log('localCacheData ==> ', localCacheData);

    console.log('根据商品类型获取商品数据');
    console.log('index ==> ', index);

    //获取指定类型
    let type = this.state.menuData[index].type;

    console.log('type ==> ', type);

    if (Object.keys(localCacheData).length > 0) {
      //判断缓存时间是否已经过期 30分钟
      //获取当前时间
      let nowTime = new Date().getTime();
      let expires = localCacheData.expires;

      //缓存没有过期
      if (nowTime - expires <= 30 * 60 * 1000) {
        //判断是否存在该类型缓存数据
        console.log('缓存没有过期');

        if (localCacheData[type]) {
          console.log('该类型存在缓存数据');
          this.setState({
            productData: localCacheData[type]
          })
          return;
        }
        
      } else {
        //重置本地缓存数据
        localCacheData = {};
        console.log('缓存数据已经过期, 重置本地缓存数据');
      }
      
    }
    

    console.log('该类型不存在缓存数据');


    //数据缓存的键名
    let cacheKey = '';

    let key = '';
    let value = '';
    if (type === 'isHot') {
      key = 'isHot';
      value = 1;
      cacheKey = key;
    } else {
      key = 'type';
      value = type;
      cacheKey = value;
    }

    //获取指定类型商品数据
    this.$axios({
      method: 'get',
      url: '/typeProducts',
      params: {
        key,
        value
      }
    }).then(res => {
      console.log('res ==> ', res);

      if (res.data.code === 500) {
        this.setState({
          productData: res.data.result
        })

        //首次缓存数据时设置缓存有效时间
        if (Object.keys(localCacheData).length  === 0) {
          localCacheData.expires = new Date().getTime();
        }

        
        localCacheData[cacheKey] = res.data.result;

        //将商品数据缓存到本地存储
        localStorage.setItem('typeProduct', JSON.stringify(localCacheData));
      }
    }).catch(err => {
      console.log('err ==> ', err);
    })
  }

  //携带商品pid跳转商品详情页面
  goDetail(pid) {
    this.props.history.push({pathname: `/detail/${pid}`});
  }

  //创建商品列表
  createProductList() {
    return this.state.productData.map((v, i) => {
      return (
        <div className="pro-item" key={i} onClick={this.goDetail.bind(this, v.pid)}>
          <Product data={v} />
        </div>
      );
    })
  }

  render() {
    return (
      <div className="menu">
        <Search sticky />
        <div className="menu-box">
          <div className="menu-aside">
            <AsideMenu activeIndex={this.state.menuActiveIndex} change={this.getProductByType.bind(this)}>
              {this.createAsideMenuItemList()}
            </AsideMenu>
          </div>
          <div className="menu-content">
            <div className="pro-list">

              {this.createProductList()}

            </div>
          </div>
        </div>
      </div>
    )
  }
}
