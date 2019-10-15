import React from  'react'
import './css/rank.css'
import { observer, inject } from 'mobx-react'
@inject("rankingStore")
@observer
class RankingList extends React.Component{
    //跳转到榜单
    go() {
        this.props.history.push({ pathname:'/ranking/listDetails/:id'})
    }
    componentDidMount() {
        //获取热歌榜
        this.props.rankingStore.getRankingHot()
        //新歌            
        this.props.rankingStore.getRankingNew() 
        //飙升
        this.props.rankingStore.getRankingSoaring() 
        //原创
        this.props.rankingStore.getRankingOriginal()  
        //说唱
        this.props.rankingStore.getRankingRap()  
        //美国榜
        this.props.rankingStore.getRankingAmerica()   
        //韩国
        this.props.rankingStore.getRankingKorea()
        //日本
        this.props.rankingStore.getRankingJapanese()
        //iTunes榜 
        this.props.rankingStore.getRankingItunes()    
    }
    render(){       
        //热歌
        let cart = this.props.rankingStore.cart.slice(0,3)
        let hotJpg = this.props.rankingStore.hotCoverImg
        let hotId = this.props.rankingStore.hotId
        //新歌      
        let newSong = this.props.rankingStore.newSong.slice(0,3)
        let newJpg = this.props.rankingStore.newCoverImg
        let newId = this.props.rankingStore.newId
        //飙升
        let soaring = this.props.rankingStore.soaring.slice(0,3)
        let soaringJpg = this.props.rankingStore.soaringCoverImg
        let soaringId = this.props.rankingStore.soaringId
        //原创
        let original = this.props.rankingStore.original.slice(0,3)
        let originalJpg = this.props.rankingStore.originalCoverImg
        let originalId = this.props.rankingStore.originalId
        //说唱
        let rap = this.props.rankingStore.rap.slice(0,3)
        let rapJpg = this.props.rankingStore.rapCoverImg
        let rapId = this.props.rankingStore.rapId
        //美国榜
        let AmericaJpg = this.props.rankingStore.AmericaCoverImg
        let AmericaName = this.props.rankingStore.AmericaName
        let AmericaId = this.props.rankingStore.AmericaId
        //韩国榜
        let KoreaJpg = this.props.rankingStore.KoreaCoverImg
        let KoreaName = this.props.rankingStore.KoreaName
        let KoreaId = this.props.rankingStore.KoreaId
        // 日本
        let JapaneseJpg = this.props.rankingStore.JapaneseCoverImg
        let JapaneseName = this.props.rankingStore.JapaneseName
        let JapaneseId = this.props.rankingStore.JapaneseId
        //iTunes榜
        let ItunesJpg = this.props.rankingStore.ItunesCoverImg
        let ItunesName = this.props.rankingStore.ItunesName
        let ItunesId = this.props.rankingStore.ItunesId
        //获取官方图片数组
        // let officialImg = [hotJpg,newJpg,soaringJpg,originalJpg,rapJpg]
        //获取官方id数组
        // let officialId = [hotId,newId,soaringId,originalId,rapId]
        let official = [
            { jpg:hotJpg, id:hotId, name:cart },
            { jpg:newJpg, id:newId, name:newSong },
            { jpg:soaringJpg, id:soaringId, name:soaring  },
            { jpg:originalJpg, id:originalId, name:original  },
            { jpg:rapJpg, id:rapId, name:rap}
        ]
        //获取全球排行榜图片数组
        let allImg = [AmericaJpg,KoreaJpg,JapaneseJpg,ItunesJpg]
        //获取全球名字数组
        let allName = [AmericaName,KoreaName,JapaneseName,ItunesName]   
        //获取全球id数组
        let allId = [AmericaId,KoreaId,JapaneseId,ItunesId] 
        // console.log(allName)
        // allImg.push(AmericaJpg,KoreaJpg,JapaneseJpg,ItunesJpg)
        return (
            <div>
                <div className="official">
                    <h3>官方榜</h3>
                    <ul className="section" onClick={this.go.bind(this)}>
                        {official.map((item,index) =><li key={index} id={item.id}>
                            <img src={item.jpg} alt=""/>
                            <ul className="box-1">
                                {/* {cart.map((data,i)=><li key={data.id}>{i+1+'.'}{data.name}</li>)}   */}
                                {/* <li>{index+1+'.'}{item.name}</li> */}
                                {item.name.map((data,i) => <li key={i}>{i+1+'.'}{data.name}</li>)}
                            </ul>   
                        </li>)}
                    </ul>
                </div>
                <div className="global">
                    <h3>全球榜</h3>
                    <ul>
                        {allImg.map((item,index) => <li key={index}>
                            <img src={item} alt=""/>                           
                        </li>)}
                        {allName.map((data,index) => <p key={index}>{data}</p>)}
                    </ul>
                </div>
            </div>
        )
    }
}
export default RankingList