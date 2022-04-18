import React from "react";
import { Button } from 'antd-mobile-v2'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Home from "./pages/home";
import CityList from "./pages/cityList";
import Map from './pages/Map'

// 项目的根组件
function App() {
  return (
    <Router>
      <div className="App">
        {/* 默认路由 */}
      <Route path='/' exact render={() => <Redirect to='/home' />}/>
      <Route path='/home' component={Home} />    
      <Route path='/cityList' component={CityList} />    
      <Route path='/map' component={Map}/>
      </div>
    </Router>
  );
}

export default App;
