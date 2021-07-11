import { Component } from 'react'

import './Tabbar.css'

export default class Tabbar extends Component {

  constructor() {
    super();

    this.state = {
      //激活tabbar的选项, 默认激活的下标
      activeIndex: 0
    }
  }

  componentDidMount() {

    let index = parseFloat(this.props.activeIndex);

    if (!Number.isNaN(index)) {

      this.setState({
        activeIndex: index
      })
    }

  }

  //修改activeIndex
  updateActiveIndex(index) {
    // console.log('index ==> ', index);
    if (index === this.state.activeIndex) {
      return;
    }

    this.setState({
      activeIndex: index
    })
  }

  //创建Tabbar
  createTabbarList() {
    return  this.props.children.map((v, i) => {
      return (
        <v.type key={i} active={this.state.activeIndex === i} {...v.props} toggleIndex={this.updateActiveIndex.bind(this, i)} />
      );
    })
  }


  render() {
    return (
      <div className="tabbar">
        {this.createTabbarList()}
      </div>
    )
  }
}
