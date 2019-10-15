import React from 'react'
import './footer.css'
import player from '../assets/player3.png'
import pause from '../assets/player2.png'
import unplaying from '../assets/unplaying.png'
import { observer, inject } from 'mobx-react'
import {withRouter} from "react-router-dom"
@inject('searchStore')
@withRouter
@observer
class Footer extends React.Component {
    constructor(){
        super()
        /* this.state={
            currentPlayer:
        } */
    }
    pausePlayer(e){
        let {PAUSEPLAYER}=this.props.searchStore
        let playState=e.currentTarget.getAttribute('playstate')
      /*   this.refs.audio.canplay() */
        if(playState=='player'){
            PAUSEPLAYER('pause')
           /*  this.refs.audio.pause() */
        }else{
            PAUSEPLAYER('player')
            /* this.refs.audio.play() */
        }
    }
    jumpToPlayer(id){
        let {PAUSEPLAYER}=this.props.searchStore
        PAUSEPLAYER('pause')
        this.props.history.push({pathname:`/player/${id}`})
    }
    render() {
        let {playSong}=this.props.searchStore
        return (
            <div className="footer" onClick={this.jumpToPlayer.bind(this,playSong.id)}>
                <div className="single" >
                    <img src={playSong.img} alt="" />
                    <div>
                        <p className="songName">{playSong.name}</p>
                        <p className="author">{playSong.author}</p>
                    </div>
                </div>
                <div className="playing"
                 onClick={this.pausePlayer.bind(this)}
                 id={playSong.id} 
                 playstate={playSong.playState}>
                         <img src={playSong.playState=='player'?player:pause}/>
                </div>
                <audio ref="audio" style={{display:'none'}} src={playSong.playState=='player'?playSong.url:''} autoPlay></audio>
            </div>
        )
    }
}

export default Footer