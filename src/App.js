
import './App.css';

import { Component } from 'react';

import {Switch} from 'react-router-dom';

import {route} from './route/route'

export default class App extends Component {
  render() {
    return (
      <div>

        {/* 一级路由 */}
        <Switch>
          {this.$createRoute(route)}
        </Switch>
        
      </div>
    )
  }
}

