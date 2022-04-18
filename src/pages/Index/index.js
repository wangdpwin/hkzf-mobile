import React from "react";
import axios from 'axios';
import { Carousel, WingBlank, Flex, WhiteSpace, Grid} from 'antd-mobile-v2';
import nav1 from '../../assets/images/nav-1.png';
import nav2 from '../../assets/images/nav-2.png';
import nav3 from '../../assets/images/nav-3.png';
import nav4 from '../../assets/images/nav-4.png';
import './index.scss'

const url = 'http://120.48.7.30:8080';

const navs = [
    {
        id: 1,
        img: nav1,
        title: '租房',
        path:'/home/houses'
    },
    {
        id: 2,
        img: nav2,
        title: '合租',
        path:'/home/index'
    },
    {
        id: 3,
        img: nav3,
        title: '地图找房',
        path:'/home/index'
    },
    {
        id: 4,
        img: nav4,
        title: '去出租',
        path:'/home/index'
    }
];

const data = Array.from(new Array(4)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
  }));

class Index extends React.Component {
    
    state = {
        swipers: [],
        imgHeight: 212,
        isSwiperLoaded: false,
        groups: [],
        news: [],
        currentCityName: ''
    }

    async getCurrentCity() {
        const myCity = new window.BMapGL.LocalCity();
        myCity.get(async res => {
            let cityName = res.name;
            const result = await axios.get(url+'/area/info?name='+cityName);
            console.log('cityName',cityName);
            console.log('result',result);
            this.setState({currentCityName:result.data.body.label});
        });
    }

    // 获取轮播图
    async getSwipers() {
        let {data: res} = await axios.get(url+'/home/swiper')
        console.log('data',res);
        // 判断返回的状态是否是成功
        if(res.status!= 200){
            console.error(res.description)
            return
        }
        // 把获取到的值设置给state
        this.setState({
            swipers: res.body,
            isSwiperLoaded: true
        })
    }
    
    // 获取租房小组
    async getGroups() {
        let res = await axios.get(url+'/home/groups',{
            params: {
                area: 'AREA|88cff55c-aaa4-e2e0'
            }
        });
        console.log('res',res);
        // 判断返回的状态是否是成功
        if(res.status!= 200){
            console.error(res.status)
            return
        }
        
        this.setState({
            groups: res.data.body
        })
    }

    async getNews() {
        const res = await axios.get(url+'/home/news');
        // 判断返回的状态是否是成功
        if(res.status!= 200){
            console.error(res.status)
            return
        }
        
        this.setState({
            news: res.data.body
        })
    }

    componentDidMount() {
        this.getSwipers();
        this.getGroups();
        this.getNews();
        this.getCurrentCity();
     }

    renderNavs() {
        return navs.map(item => (
             <Flex.Item key={item.id} onClick={() => {this.props.history.push(item.path)}}>
                <img src={item.img} alt=''/>
                <h2>{item.title}</h2>
            </Flex.Item>
        ))
    }

    renderSwipers() {
        return (
            this.state.swipers.map(item => (
                <a
                  key={item.id}
                  href="https://t7.baidu.com/it/u=2621658848,3952322712&fm=193&f=GIF"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`${url}${item.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                  />
                </a>
              ))
        )
    }

    renderGroups(item) {
        return (
            <Flex className="group-item" justify="around">
                <div>
                    <p className="title">{item.title}</p>
                    <span className="info">{item.desc}</span>
                </div>
                <img src={`${url}${item.imgSrc}`} alt="" />
            </Flex>
        )
    }

    renderNews() {
        return this.state.news.map(item => {
            return (
                <div className="news-item" key={item.id}>
                    <div className="imgwrap">
                        <img
                            className="img"
                            src={`${url}${item.imgSrc}`}
                            alt=""
                        />
                    </div>
                    <Flex className="content" direction="column" justify="between">
                        <h3 className="title">{item.title}</h3>
                        <Flex className="info" justify="between">
                            <span>{item.from}</span>
                            <span>{item.date}</span>
                        </Flex>
                    </Flex>
                </div>
            )
        })
    }

    render() {
        return (
          <div>
            {/* 轮播图 */}
            <div className="swiper">
                {this.state.isSwiperLoaded ? 
                    <Carousel
                        autoplay={true}
                        autoplayInterval={5000}
                        infinite={true}
                    //   beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    //   afterChange={index => console.log('slide to', index)}
                    >
                        {this.renderSwipers()}
                    </Carousel>
                    : ''
                }

                {/* 搜索框 */}
            <Flex className="search-box">
                {/* 左侧白色区域 */}
                <Flex className="search">
                {/* 位置 */}
                <div
                    className="location"
                    onClick={() => this.props.history.push('/citylist')}
                >
                    <span className="name">{this.state.currentCityName}</span>
                    <i className="iconfont icon-arrow" />
                </div>

                {/* 搜索表单 */}
                <div
                    className="form"
                    onClick={() => this.props.history.push('/search')}
                >
                    <i className="iconfont icon-seach" />
                    <span className="text">请输入小区或地址</span>
                </div>
                </Flex>
                {/* 右侧地图图标 */}
                <i
                className="iconfont icon-map"
                onClick={() => this.props.history.push('/map')}
                />
            </Flex>
            </div>        
            
            {/* 导航菜单 */}
            <Flex className="nav">
                {this.renderNavs()}
            </Flex>
             {/* 租房小组 */}
             <div className="group">
                <h3 className="group-title">
                    租房小组 <span className="more">更多</span>
                </h3>        
                <Grid data={this.state.groups} activeStyle={true} columnNum={2} square={false} hasLine={false}
                    renderItem = {(item) => this.renderGroups(item)}
                />
            </div>    
            {/* 资讯 */}
            <div className="news">
                <h3>最新资讯</h3>
                <WingBlank size="md">{this.renderNews()}</WingBlank>
            </div>

          </div>
        );
      }
}

export default Index;