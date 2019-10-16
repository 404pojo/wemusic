import React from  'react'
import "../../assets/css/songList.css"     
import {observer,inject} from "mobx-react"
import player from "../../assets/imgs/player.png"
import singer from "../../assets/imgs/singer.png"
import down from "../../assets/imgs/down.png"
import up from "../../assets/imgs/up.png"
import ear from "../../assets/imgs/ear.png"
import back from "../../assets/imgs/back.png"

@inject("songListStore")
@observer
class SongList extends React.Component{
    constructor(){
        super()
        this.state={
            changeimg:true
        }
    }
    
    componentWillMount(){
        let {getsongList}=this.props.songListStore
        let id=this.props.match.params.id
        this.props.songListStore.getsongList(id)
    }
    changeClass(){
        this.setState({
            changeimg:!this.state.changeimg
        })
    }
    back() {
        this.props.history.go(-1)
    }
    play(i,d){
        console.log(i,d)
        this.props.history.push({pathname:`/player/${d}`})
        
    }
    render(){
        // console.log(this.props.songListStore.cart.tracks)
        const {cart,songs,creator,tags,description,playCount}=this.props.songListStore
       
        let count=Math.round(parseFloat(playCount/10000)*10)/10
        
        const down2=(<div className="intro11" >
                <div className="label1">标签：{tags.map((item,index)=><span key={index} className="label1s">{item}</span>)}</div>
                <div className="jianjie">简介：{description.map((item,index)=><span key={index}><i className="des">{item}</i><br></br></span>)}</div>
                <span className="down"><img src={down} alt="" className="downimg" onClick={this.changeClass.bind(this)}/></span>
            </div>)
        const up2=(<div className="intro111" >
                <div className="label1">标签：{tags.map((item,index)=><span key={index} className="label1s">{item}</span>)}</div>
                <div className="jianjie">简介：{description.map((item,index)=><span key={index}><i className="des">{item}</i><br></br></span>)}</div>
                <span className="down"><img src={up} alt="" className="downimg" onClick={this.changeClass.bind(this)}/></span>
            </div>)
        return (
            <div>
                <div className="box">
                    <div className="bg bg-blur" style={{backgroundImage:`url(${cart.coverImgUrl})`}}></div>
                    <div className="header11" >
                        <div className="box1">
                            <img src={back} alt="" className="back" onClick={this.back.bind(this)}/>
                            <div className="left">
                                <div className="left1">
                                    <img src={cart.coverImgUrl} className="img1"/>
                                    <span className="playCount"><img src={ear} alt="" className="ear"/>{count}万</span>
                                    <span className="list">歌单</span>
                                </div>
                                
                            </div>
                            <div className="right">
                                <h2 className="rightname">{cart.name}</h2>
                                <span className="creatorbox">

                                    <img src={creator.avatarUrl} alt="" className="creatorimg"/>
                                    <b className="b">{creator.nickname}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>    
                {/* <div className="intro" >
                    <div className="label">标签：{tags.map((item,index)=><span key={index} className="labels">{item}</span>)}</div>
                    <div className="jianjie">简介：{description.map((item,index)=><span key={index}><i className="des">{item}</i><br></br></span>)}</div>
                    {this.state.changeimg?down1:up1}
                </div> */}
                {this.state.changeimg?down2:up2}
                <div className="Main_title2">
                    <h4 className="gequ">歌曲列表</h4>
                    <div className="song">
                        <ul className="ulul">
                            {songs.map((item,index)=>
                            <li key={index} className="lili" onClick={this.play.bind(this,index,item.id)}>
                                
                                <div className="song_title">
                                    {/* <span className="index">{index+1}</span> */}
                                    <h3>{item.name}</h3>
                                    <div className="author">
                                        <img src={singer} alt="" />
                                        <span>{item.ar[0].name} - {item.al.name}</span>
                                    </div>
                                </div>
                                <img src={player} alt="" className="player11" />
                            </li>)}       
                        </ul>
                    </div>
                </div>
            </div>                 
        )
    }
}

export default SongList