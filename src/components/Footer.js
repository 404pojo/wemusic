import React from 'react'
import './footer.css'
import player from '../assets/player3.png'
import pause from '../assets/player2.png'
import unplaying from '../assets/unplaying.png'
import { observer, inject } from 'mobx-react'
@inject('searchStore')
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
        if(playState=='player'){
            PAUSEPLAYER('pause')
        }else{
            PAUSEPLAYER('player')
        }
    }
    render() {
        let {playSong}=this.props.searchStore
        return (
            <div className="footer">
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
                <audio style={{display:'none'}} src={playSong.playState=='player'?playSong.url:''} autoPlay></audio>
            </div>
        )
    }
}

export default Footer