import React from  'react'
import { Slider, WingBlank, WhiteSpace } from 'antd-mobile';
import player from './player.css';
import logo from "./img/232.jpg";
import goBack from "./img/goBack.png";
import share from "./img/share.png";
import heart from "./img/heart.png";
import hearts from "./img/hearts.png";
import download from "./img/download.png";
import comment from "./img/comment.png";
import info from "./img/info.png";

import xh from "./img/xh.png";
import sjbf from "./img/sjbf.png";
import dqxh from "./img/dqxh.png";
import zbf from "./img/zbf.png";
import ybf from "./img/ybf.png";
import stop from "./img/stop.png";
import start from "./img/start.png";
import menu from "./img/menu.png";
import {observer,inject} from "mobx-react";

@inject('playerStore')
@observer
class Player extends React.PureComponent{
    myRef = React.createRef();
    constructor(){
        super();
        this.state = {
            isShow:true,
            url:"",     // 音频的播放地址
            isPlay:false,    // 是否在播放
            totalTime: "00:00",   // 总时间
            currentTime: "00:00", // 当前播放时间
            nowTime:1,
            allTime:1,
        }
        
    }
    isShow(){
        let isShows = this.state.isShow
        this.setState({
            isShow:!isShows
        })
        // console.log(this.state.isShow)
    }
    startPlay(){
      try{
        const cTime = parseInt(this.refs.myRef.currentTime);
        this.setState({
            isPlay:!this.state.isPlay,
            currentTime:this.getTime(cTime)
        })
        this.state.isPlay?this.refs.myRef.play():this.refs.myRef.pause();
        this.state.isPlay?this.refs.rotateImg.className="rotateImages":this.refs.rotateImg.className="";
        this.state.isPlay?this.refs.BoFang.src=stop:this.refs.BoFang.src=start
        // console.log(this.refs.myRef.duration);
        // console.log(this.refs.myRef.currentTime);
      }catch{}
    }
    goBack(){
        this.props.history.go(-1);
    }
    // 上一首
    previousSong(){
        let ids = [];
        this.props.playerStore.musicId.map(item=>{
            this.props.playerStore.getMusicUrl(item);
            this.props.playerStore.getMusicInfo(item);
        });   // 将proxy对象转换为数组
        console.log(ids)

    }
    // 下一首
    nextSong(){
        let ids = [];
        this.props.playerStore.musicId.map(item=>{
            this.props.playerStore.getMusicUrl(item);
            this.props.playerStore.getMusicInfo(item);
        });   // 将proxy对象转换为数组
        console.log(ids)

    }
    componentDidMount(){
        let id = this.props.match.params.id;    // 获取路由上的id
        this.props.playerStore.getMusicUrl(id);
        this.props.playerStore.getMusicInfo(id);
        this.props.playerStore.getMusicId();
        
        // 这里需要设置audio的canplay事件监听
        this.refs.myRef.addEventListener("canplay", () => {
            //获取总时间
            const totalTime = parseInt(this.refs.myRef.duration);
            this.state.allTime = parseInt(this.refs.myRef.duration);
            
            this.setState({
                totalTime: this.getTime(totalTime),
                
            });
        });

        this.refs.myRef.addEventListener("timeupdate",()=>{
            if(this.refs.myRef){
                const cTime = parseInt(this.refs.myRef.currentTime);
                // console.log(this.refs.mySilder.props.onChange)
                this.setState({
                    currentTime:this.getTime(cTime),
                    nowTime: parseInt(this.refs.myRef.currentTime)
                });
            }
        });

        console.log(this.refs.myRef);
    }
    log = (name) => {
        return (value) => {
            console.log(`${name}: ${value}`);
        };
    }
    // 秒转换-分:秒的格式
    getTime = time => {
        if (time) {
        const minute = parseInt((time / 60) % 60);
        const second = parseInt(time % 60);
        let minuteText = `${minute}`;
        let secondText = `${second}`;
        if (minute < 10) {
            minuteText = `0${minute}`;
        }
        if (second < 10) {
            secondText = `0${second}`;
        }
        return `${minuteText}:${secondText}`;
        } else {
        return "00:00";
        }
    };
    render(){
        // const { fromJS } = require('immutable')
        const {musicId,artist,songInfo,songAlbum,cart} = this.props.playerStore;
        // console.log(musicId);
        
        
        const disc = <div id="disc">
                        {/* 中间转动的专辑图片 */}
                        <div className="disc">
                            <div ref="rotateImg" className="rotateImages" style={{backgroundImage: `url(${songAlbum.picUrl})`,backgroundSize:'120%',backgroundRepeat:'no-repeat',  filter: 'blur(2px)'}}></div>
                        </div>
                        {/* 喜欢 下载 评论 信息 */}
                        <div className="main-bottom">
                            <span><img src={heart} width="40px"/></span>
                            <span><img src={download} width="40px"/></span>
                            <span><img src={comment} width="40px"/></span>
                            <span><img src={info} width="40px"/></span>
                        </div>
                    </div>;
        // 歌词
        const lyric = <ul>
                        <li>该怎么去形容你最贴切</li>
                        <li>拿什么跟你作比较才算特别</li>
                        <li>对你的感觉 强烈</li>
                        <li>却又不太了解 只凭直觉</li>
                        <li>你像我在被子里的舒服</li>
                        <li>却又像风 琢磨不住</li>
                        <li>像手纹 像散发的香水味</li>
                        <li>像爱不释手的 红色高跟鞋</li>
                        <li>该怎么去形容你最贴切</li>
                        <li>拿什么跟你作比较才算特别</li>
                        <li>对你的感觉 强烈</li>
                        <li>却又不太了解 只凭直觉</li>
                        <li>你像我在被子里的舒服</li>
                        <li>却又像风 琢磨不住</li>
                        <li>像手纹 像散发的香水味</li>
                        <li>像爱不释手的 红色高跟鞋</li>
                    </ul>    
        let allTime = this.state.allTime;
        let nowTime = this.state.nowTime;
        return (
            
            <div>
                <div className="bg1 bg-blur1" style={{backgroundImage:`url(${songAlbum.picUrl})`}}></div>
                <div className="player1 player2">
                    <header>
                        <div className="header-left">
                            <div className="left">
                                <a onClick={this.goBack.bind(this)}><img src={goBack} width="50px" /></a>
                                <div>
                                    <p>{songInfo.name}</p>
                                    <p className="p-box">{artist} ></p>
                                </div>
                            </div>
                            <a href="#" className="share"><img src={share} width="40px"/></a>
                        </div>
                    </header>
                    <section id="main">
                        <div onClick={this.isShow.bind(this)}>
                            {this.state.isShow?disc:lyric}
                        </div>
                    </section>
                    
                    <footer>
                        <div className="am-slider-example">
                            <WhiteSpace size="lg" />
                                <WingBlank size="lg">
                                    <div className="Jindu">
                                        <span style={{width:120,fontSize:30}}>{this.state.currentTime}</span>
                                        <Slider
                                            style={{ width:500}}
                                            defaultValue={0}
                                            value={nowTime}
                                            min={0}
                                            max={allTime}
                                            onChange={this.log('change')}
                                            onAfterChange={this.log('afterChange')}
                                            ref="mySilder"
                                        />
                                        <span style={{width:120,fontSize:30}}>{this.state.totalTime}</span>
                                    </div>
                                </WingBlank>
                            <WhiteSpace size="lg" />
                        
                        </div>
                        <div className="playBtn">
                            <span><img src={xh} width="32%"/></span>                    
                            <span onClick={this.previousSong.bind(this)}><img src={zbf} width="32%"/></span>                    
                            <span onClick={this.startPlay.bind(this)}><img ref="BoFang" src={stop} width="40%"/>                   
                               <audio src={cart.url} autoPlay loop ref="myRef" />
                            </span> 
                            <span onClick={this.nextSong.bind(this)}><img src={ybf} width="32%"/></span>                    
                            <span><img src={menu} width="32%"/></span>     
                        </div>               
                    </footer>
                </div>
            </div>
        )
    }
}

export default Player