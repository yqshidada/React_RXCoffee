import { Component } from 'react'

import './AsideMenu.css'

export default class AsideMenu extends Component {

  constructor() {
    super();
    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount() {

    // console.log('AsideMenu this.props ==> ', this.props);

    let index = parseFloat(this.props.activeIndex);

    if (!Number.isNaN(index)) {

      this.setState({
        activeIndex: index
      })
    }
  }

  //切换商品类型
  updateActiveIndex(index) {

    if (index === this.state.activeIndex) {
      return;
    }

    this.setState({
      activeIndex: index
    })

    this.props.change(index);
  }

  //创建aside-menu-item列表
  createAsideMenuItems() {
    return this.props.children.map((v, i) => <v.type active={this.state.activeIndex === i} key={i} toggleMenuItem={this.updateActiveIndex.bind(this, i)}>{v.props.children}</v.type>)
  }

  render() {
    return (
      <div className="aside-menu-box">
        {this.createAsideMenuItems()}
      </div>
    )
  }
}
