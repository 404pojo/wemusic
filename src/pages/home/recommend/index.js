import React from 'react';
import './Main.css';
import Bg from "./Img/ear.png"
import Author from "./Img/author.png"
import Player from "./Img/播放.png"
import Pause from "./Img/暂停.png"
import { inject, observer } from "mobx-react"
import {withRouter} from "react-router-dom"
@inject('recommendStore','searchStore')
@withRouter
@observer
class Recommend extends React.Component {
    constructor() {
        super()
        this.state = {
            player: Player,
            pause: Pause,
            song: [],

            active: true,
            playState:'pause',
            activePlayer:''
        }
    }
    componentDidMount() {
        this.props.recommendStore.getList()
        this.props.recommendStore.getSong()
    }
    handlePlay(e) {
        let { PLAYSONG } = this.props.searchStore
        let id = e.target.getAttribute("id")
        let playState = e.target.getAttribute('playstate')
        let randomStr = e.target.getAttribute('randomstr')
        console.log(randomStr)
        PLAYSONG(randomStr, id, playState)
        //如果当前点击按钮为播放状态，则改为暂停，同时将其他所有按钮设为暂停
        if (playState == 'player') {
             this.setState({
                 playState:randomStr
             })  
            e.currentTarget.setAttribute('playstate', 'pause') 
        }else{    
        //如果当前点击按钮为暂停状态，则改为播放，同时其他所有按钮设为暂停
            this.setState({
                playState:randomStr
            }) 
            e.currentTarget.setAttribute('playstate', 'player')
        }        

    }
    jumpToSongList(id){
        this.props.history.push({pathname:`/songList/${id}`})
    }
    jumpToPlay(id){
        let { PLAYSONG, PAUSEPLAYER} = this.props.searchStore
        PLAYSONG('', '', 'player')
        PAUSEPLAYER('pause')
        this.props.history.push({pathname:`/player/${id}`})
    }
    render() {
        let { showPlayer} = this.props.searchStore

        const { fromJS } = require('immutable');
        const { product, song } = this.props.recommendStore
        const newSong = product.filter(function (item, index) {
            return index < 28 && index > 21;
        })
        const songName = song.filter(function (item, index) {
            return index < 7;
        })
        this.state.song = songName

        return (
            
            <div className="Main">
                <div className="Main_title1">
                    <h2>推荐歌单</h2>
                    <ul>
                        {newSong.map(item => <li key={item.id} onClick={this.jumpToSongList.bind(this,item.id)}>
                            {/* <a href=""> */}
                                <img src={item.coverImgUrl} alt="" />
                                <span className="bg">
                                    <img src={Bg} alt="" />
                                    {item.subscribedCount % 1000}万
                                </span>
                           {/*  </a> */}
                            <p>{item.name}</p>
                        </li>)}
                    </ul>
                </div>
                <div className="Main_title2">
                    <h2>推荐音乐</h2>
                    <div className="song">
                        <ul>
                            {songName.map((item,index) => <li key={item.id}>
                                <div className="song_title" onClick={this.jumpToPlay.bind(this,item.id)}>
                                    <h3>{item.name}</h3>
                                    <div className="author">
                                        <img src={Author} alt="" />
                                        <span>{fromJS(item).getIn(['artists', '0', 'name'])} - {fromJS(item).getIn(['album', 'type'])}</span>
                                    </div>
                                </div>
                                <img 
                                className="player"
                                randomstr={index+1+item.id+item.name}
                                id={item.id}
                                playstate={index+1+item.id+item.name==this.state.playState?'player':'pause'}
                                 onClick={this.handlePlay.bind(this)}
                                 src={  showPlayer==(index+1+item.id+item.name)? Pause :Player }
                                 />
                            </li>)}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

export default Recommend