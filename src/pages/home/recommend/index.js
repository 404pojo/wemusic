import React from 'react';
import './Main.css';
import Bg from "./Img/ear.png"
import Author from "./Img/author.png"
import Player from "./Img/播放.png"
import Pause from "./Img/暂停.png"
import { inject, observer } from "mobx-react"
@inject('recommendStore')
@observer


class Recommend extends React.Component {
    constructor() {
        super()
        this.state = {
            player: Player,
            pause: Pause,
            active: 0,
            song: []
        }
    }
    componentDidMount() {
        this.props.recommendStore.getList()
        this.props.recommendStore.getSong()
    }
    handlePlay(el, e) {
        e.target.src = (e.target.src === this.state.player ? this.state.pause : this.state.player)

    }
    render() {
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
                        {newSong.map(item => <li key={item.id}>
                            <a href="">
                                <img src={item.coverImgUrl} alt="" />
                                <span className="bg">
                                    <img src={Bg} alt="" />
                                    {item.subscribedCount % 1000}万
                                </span>
                            </a>
                            <p>{item.name}</p>
                        </li>)}
                    </ul>
                </div>
                <div className="Main_title2">
                    <h2>推荐音乐</h2>
                    <div className="song">
                        <ul>
                            {songName.map(item => <li key={item.id}>
                                <div className="song_title">
                                    <h3>{item.name}</h3>
                                    <div className="author">
                                        <img src={Author} alt="" />
                                        <span>{fromJS(item).getIn(['artists', '0', 'name'])} - {fromJS(item).getIn(['album', 'type'])}</span>
                                    </div>
                                </div>
                                <img src={this.state.player} className="player" onClick={this.handlePlay.bind(this, item.id)} />
                            </li>)}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

export default Recommend