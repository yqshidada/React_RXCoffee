import { Component } from 'react'

import {Switch} from 'react-router-dom'

import Tabbar from '../../components/Tabbar/Tabbar'

import TabbarItem from '../../components/TabbarItem/TabbarItem'

import {mainRoute} from '../../route/route'

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      tabbarData: [
        {
          title: '首页',
          inactiveIcon: require('../../images/home.png').default,
          activeIcon: require('../../images/home_active.png').default,
          path: '/'
        },
        {
          title: '菜单',
          inactiveIcon: require('../../images/menu.png').default,
          activeIcon: require('../../images/menu_active.png').default,
          path: '/menu'
        },
        {
          title: '购物袋',
          inactiveIcon: require('../../images/shopbag.png').default,
          activeIcon: require('../../images/shopbag_active.png').default,
          path: '/shopbag'
        },
        {
          title: '我的',
          inactiveIcon: require('../../images/my.png').default,
          activeIcon: require('../../images/my_active.png').default,
          path: '/my'
        }
      ]
    }
  }

  //创建Tabbar
  createTabbar() {
    return this.state.tabbarData.map((v, i) => <TabbarItem {...this.props} activeIcon={v.activeIcon} inactiveIcon={v.inactiveIcon} key={i} path={v.path}>{v.title}</TabbarItem>);
  }

  render() {
    return (
      <div>

        <div>
          <Switch>
            {this.$createRoute(mainRoute)}
          </Switch>
        </div>
        
        <Tabbar activeIndex="1">
            {this.createTabbar()}
        </Tabbar>
      </div>
    )
  }
}
