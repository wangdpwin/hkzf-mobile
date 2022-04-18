import React, { Component } from 'react';
import './index.scss'

class Map extends Component {

    componentDidMount() {
        // 初始化地图实例
        // 注意：在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
        const map = new window.BMapGL.Map('container');
        // 设置中心点坐标
        const point = new window.BMapGL.Point(116.404, 39.915);
        // 初始化地图
        map.centerAndZoom(point, 15);

        function myFun(result){
            var cityName = result.name;
            map.setCenter(cityName);
            console.log('location',result);
        }
        const myCity = new window.BMapGL.LocalCity();
        myCity.get(myFun);
    }

    render() {
        return (
            <div className='map'>
                <div id="container"></div> 
            </div>
        );
    }
}

export default Map;