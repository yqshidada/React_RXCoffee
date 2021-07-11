import { Component } from 'react';

import './TabbarItem.css'

export default class TabbarItem extends Component {

  toggleTabbarItem() {
    this.props.toggleIndex();
    this.props.history.push({pathname: this.props.path});
  }

  render() {
    return (
      <div className={`tabbar-item ${this.props.active ? 'active' : ''}`} onClick={this.toggleTabbarItem.bind(this)} >
        <div className="tabbar-item-box">
          <div className="tabbar-icon">
            <img className="auto-img" src={this.props.active ? this.props.activeIcon : this.props.inactiveIcon} alt="" />
          </div>
          <div className="tabbar-text">{this.props.children}</div>
        </div>
      </div>
    )
  }
}
