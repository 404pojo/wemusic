import React from 'react'
import './Match.css'
import { observer, inject } from 'mobx-react'
import {withRouter} from "react-router-dom"
import testPng from '../../../../assets/search.svg'
import sq from '../../../../assets/icon1.png'
import pause from '../../../../assets/player2.png'
import player from '../../../../assets/player3.png'
@inject('searchStore')
@withRouter
@observer
class Match extends React.Component {
    constructor() {
        super()
        this.state = {
            active: true,
            playState:'pause',
            activePlayer:''
        }
    }
    playSong(e) {
        let { PLAYSONG } = this.props.searchStore
        let id = e.target.getAttribute("id")
        let playState = e.target.getAttribute('playstate')
        let randomStr = e.target.getAttribute('randomstr')
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
    jumpToPlay(id){
        let { PLAYSONG, PAUSEPLAYER} = this.props.searchStore
        PLAYSONG('', '', 'player')
        PAUSEPLAYER('pause')
        this.props.history.push({pathname:`/player/${id}`})
    }
    render() {
        let _this=this
        /* //生成20位随机字符串用于区分所有歌曲
        var random = function (n) { // 生成n位长度的字符串
            var str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
            var result = "";
            for (var i = 0; i < n; i++) {
                result += str[parseInt(Math.random() * str.length)];
            }
            return result;
        } */


        let { searchResult, searchSongs ,showPlayer} = this.props.searchStore
        let { artist, album, mv } = searchResult
        //条件渲染 (返回的数据中有些没有album或者artist和mv，所以根据是否存在判断是否渲染)
        let renderAlbum = album ? (
            <li onClick={this.jumpToPlay.bind(this,519504381)}>
                <img src={album[0].blurPicUrl} alt="" />
                <div>
                    <p>专辑:{album[0].name}</p>
                    <span>{album[0].artist.name}</span>
                </div>
                <i>&gt;</i>
            </li>
        ) : (<span></span>)
        let renderArtist = artist ? (
            <li onClick={this.jumpToPlay.bind(this,37820828)}>
                <img src={artist[0].picUrl} alt="" />
                <div>
                    <p>歌手:{artist[0].name}</p>
                </div>
                <i>&gt;</i>
            </li>
        ) : (<span></span>)
        let renderMv = mv ? (
            <li onClick={this.jumpToPlay.bind(this,29004400)}>
                <img src={mv[0].cover} alt="" />
                <div>
                    <p>MV:{mv[0].name}</p>
                    <span>mv[0].artistName</span>
                </div>
                <i>&gt;</i>
            </li>
        ) : (<span></span>)


        return (

            <div className="match">
                <div className="top">
                    <p className='title'>最佳匹配</p>
                    <ul>
                        {renderAlbum}
                        {renderArtist}
                        {renderMv}
                    </ul>
                </div>

                <div className="bottom">
                    <ul>
                        
                        {searchSongs.map((item, index) => (
                            <li key={index} >
                                <div className="song_title" onClick={this.jumpToPlay.bind(this,item.id)}>
                                    <h3>{item.name}</h3>
                                    <div className="author">
                                        <img src={sq} alt="" />
                                        <span>{item.artists[0].name}</span>
                                        <span>-{item.album.name}</span>
                                    </div>
                                </div>
                                <img ref='img'
                                    className="player"
                                    randomstr={index+1+item.id+item.name}
                                    id={item.id}
                                    playstate={index+1+item.id+item.name==this.state.playState?'player':'pause'}
                                    onClick={this.playSong.bind(this)}
                                    src={  showPlayer==(index+1+item.id+item.name)? player :pause }
                               />
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        )
    }
}
export default Match