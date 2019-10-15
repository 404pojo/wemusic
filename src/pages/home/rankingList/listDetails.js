import React from  'react'
import './css/rankList.css'
import { observer, inject } from 'mobx-react'
import iconImg from './img/icon1.png'
import back from './img/back.png'
import { list } from '../../../../node_modules/postcss/lib/postcss'
@inject("rankingStore")
@observer
class Ranking extends React.Component{
    componentDidMount() {
        // //获取热歌榜
        let id = this.props.match.params.id  
        // console.log(this.props.match)
        this.props.rankingStore.getRankingHot(id)      
    }
    //返回上一页
    back() {
        this.props.history.go(-1)
    }
    render() {
        let playlist = this.props.rankingStore.playlist
        return ( 
            <div>
                <div className="box">
                    <div className="bg bg-blur" style={{backgroundImage:`url(${playlist.coverImgUrl})`}}></div>                 <div className="header1" >
                        <div className="box1">
                            <img src={back} alt="" className="back" onClick={this.back.bind(this)}/>
                            <div className="left ">
                                <img src={playlist.coverImgUrl} className="img1"/>
                            </div>
                            <div className="right">
                                <h2 className="rightname">{playlist.name}</h2>
                                <span className="creatorbox">
                                    <img src={playlist.creator.avatarUrl} alt="" className="creatorimg"/>
                                    {/* {fromJS(item).getIn(['artists', '0', 'name'])} - {fromJS(item).getIn(['album', 'type'])} */}
                                    <b className="b">{playlist.creator.nickname}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>    
                <div className="intro intro1 mar">
                    <div className="label">标签：{playlist.creator.description}</div>
                    {/* {tags.map((item,index)=><span key={index} className="labels">{item}</span>)} */}
                    <div className="jianjie">简介：{playlist.description}</div>
                </div>
                <div className="Main_title2">
                    <h1>歌曲列表</h1>
                    <div className="song">
                        <ul>
                            {playlist.tracks.map((item,index) =><li key={index}>                                
                                <div className="song_title">
                                    <h3>{item.name}</h3>
                                    <div className="author">
                                        <img src={iconImg} alt="" />
                                        <span>{item.ar[0].name} - {item.al.name}</span>
                                    </div>
                                </div>
                            </li>  )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
export default Ranking