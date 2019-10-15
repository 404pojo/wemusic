import React from  'react'
import './css/rank.css'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
@inject("rankingStore")
@withRouter
@observer
class RankingList extends React.Component{
    constructor() {
        super()
        this.state = {
            id:[3,0,2,1],
            id2:[5,6,21,7,8,10,9,20]
        }
    }
    //跳转到榜单
    go(id) {
        this.props.history.push({pathname:`/ranking/listDetails/${id}`})       
    }
    componentDidMount() {
        //获取全部榜单
        this.props.rankingStore.getRankingAllList()
        //获取内容摘要
        this.props.rankingStore.getRankingAllSection()  
    }
    render(){ 
        const { fromJS } = require('immutable')     
        //全部榜单
        let allList = this.props.rankingStore.allList
        //官方榜单
        let official = allList.slice(0,4)
        //全球榜单
        let global = allList.slice(14,22)
        //全部内容
        let allSection = this.props.rankingStore.allSection
        // console.log(allSection)
        //官方内容 
        let officialSection = allSection.slice(0,4)
        // console.log(officialSection)
        return (
            <div className="rankList">
                <div className="official-box">
                    <h3>官方榜</h3>
                    <div className="official">
                        <ul className="section">
                            {official.map((item,index) =><li key={index} onClick={this.go.bind(this,this.state.id[index])}>
                                <img src={item.coverImgUrl} alt=""/>
                            </li>)}
                        </ul>
                        <ul className="box-1">
                            {officialSection.map((item,index) => <li key={index} onClick={this.go.bind(this,this.state.id[index])}>
                                <ul>
                                    {item.tracks.map((data,i) => <li key={i}>{i+1}. {data.first}</li>)}
                                </ul>    
                            </li>)}
                        </ul> 
                    </div>
                </div>
                <div className="global">
                    <h3>全球榜</h3>
                    <ul>
                        {global.map((item,index) => <li key={index} onClick={this.go.bind(this,this.state.id2[index])}>
                            <img src={item.coverImgUrl} alt=""/>
                            <p>{item.name}</p>                           
                        </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
export default RankingList