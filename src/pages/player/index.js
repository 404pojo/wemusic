import React from  'react'
import { Slider, WingBlank, WhiteSpace } from 'antd-mobile';
import './player.css';
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
    componentDidMount(){
        this.props.playerStore.getMusicUrl();
        this.props.playerStore.getMusicInfo();
        console.log(this.props.playerStore.songInfo);
        
        // 这里需要设置audio的canplay事件监听
        this.refs.myRef.addEventListener("canplay", () => {
            //获取总时间
            const totalTime = parseInt(this.refs.myRef.duration);
            const cTime = parseInt(this.refs.myRef.currentTime);
            this.setState({
                totalTime: this.getTime(totalTime),
                currentTime:this.getTime(cTime)
            });
        });
        
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
        const {artist,songInfo,songAlbum,cart} = this.props.playerStore;
        // console.log(fromJS(songInfo))

        // this.state.url = cart.url;
        const disc = <div id="disc">
                        {/* 中间转动的专辑图片 */}
                        <div className="disc">
                            <div ref="rotateImg" className="rotateImages" style={{backgroundImage: `url(${songAlbum.picUrl})`,backgroundSize:'120%',backgroundRepeat:'no-repeat',  filter: 'blur(2px)'}}></div>
                        </div>
                        {/* 喜欢 下载 评论 信息 */}
                        <div className="main-bottom">
                            <span><img src={heart} width="38%"/></span>
                            <span><img src={download} width="38%"/></span>
                            <span><img src={comment} width="38%"/></span>
                            <span><img src={info} width="38%"/></span>
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
        return (
            <div>
                <div className="bg bg-blur" style={{backgroundImage:`url(${songAlbum.picUrl})`}}></div>
                <div className="player">
                    <header>
                        <div className="header-left">
                            <div className="left">
                                <a onClick={this.goBack.bind(this)}><img src={goBack} width="60%" /></a>
                                <div>
                                    <p>{songInfo.name}</p>
                                    <p>{artist} ></p>
                                </div>
                            </div>
                            <a href="#" className="share"><img src={share} width="35%"/></a>
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
                                            style={{ width:600,marginLeft: 100, marginRight: 100}}
                                            defaultValue={0}
                                            min={0}
                                            max={200}
                                            onChange={this.log('change')}
                                            onAfterChange={this.log('afterChange')}
                                        />
                                        <span style={{width:120,fontSize:30}}>{this.state.totalTime}</span>
                                    </div>
                                </WingBlank>
                            <WhiteSpace size="lg" />
                        
                        </div>
                        <div className="playBtn">
                            <span><img src={xh} width="32%"/></span>                    
                            <span><img src={zbf} width="32%"/></span>                    
                            <span onClick={this.startPlay.bind(this)}><img ref="BoFang" src={stop} width="40%"/>                   
                               <audio src={cart.url} autoPlay ref="myRef" />
                            </span> 
                            <span><img src={ybf} width="32%"/></span>                    
                            <span><img src={menu} width="32%"/></span>     
                        </div>               
                    </footer>
                </div>
            </div>
        )
    }
}

export default Player