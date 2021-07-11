import {Route} from 'react-router-dom';

export const createRoute = routeConfig => {
  //routeConfig: 路由配置, Array, [{name: '', path: '', component: ''}, ...]
  return routeConfig.map(v => <Route key={v.name} path={v.path} component={v.component} />);
}