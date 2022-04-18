import React from "react"
import { Route } from "react-router-dom"
import {TabBar} from 'antd-mobile-v2'
import './index.css'
import Index from '../Index'
import Houses from "../Houses"
import News from "../News"
import Profile from "../Profile"

const tabItems = [
  {
    title: "首页",
    key: "index",
    icon: {
        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' 
    },
    selectedIcon: {
        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
    },
    path: '/home'
  },
  {
    title: "找房",
    key: "houses",
    icon: {
        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
    },
    selectedIcon: {
        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
    },
    path: '/home/houses'
  },
  {
    title: "资讯",
    key: "news",
    icon: {
        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' 
    },
    selectedIcon: {
        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
    },
    path: '/home/news'
  },
  {
    title: "我的",
    key: "profile",
    icon: {
        background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' 
    },
    selectedIcon: {
        background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
    },
    path: '/home/profile'
  }
]


class Home extends React.Component {
        
    state = {
        selectedTab: this.props.location.pathname,
        hidden: false,
        fullScreen: true,
    }
         
    componentDidUpdate(prevProps) {
      if(prevProps.location.pathname != this.props.location.pathname) {
        this.setState({selectedTab: this.props.location.pathname})
      }
    }

    renderTabBarItems() {
      return tabItems.map(item => (
        <TabBar.Item
            title={item.title}
            key={item.key}
            icon={<div style={{
                width: '22px',
                height: '22px',
                background: item.icon.background}}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: item.selectedIcon.background}}
              />
              }
            selected={this.state.selectedTab === item.path}
            onPress={() => {
              this.setState({
                selectedTab: item.path,
              })
              //编程式控制路由
              this.props.history.push(item.path);
            }}
         />
      ));
    }

    render () {
       // console.log(this.props.location.pathname)
        return (
            <div className="home" padding-bottom>
            {/* 子路由 exact精确匹配 */}
            <Route exact path='/home' component={Index} />
            <Route path='/home/houses' component={Houses} />
            <Route path='/home/news' component={News} />
            <Route path='/home/profile' component={Profile} />

            <TabBar
            tintColor="#21b97a"
            barTintColor="white"
            noRenderContent="true"
            >
            {this.renderTabBarItems()}
           </TabBar>
      </div>
        )
    }
} 

export default Home;