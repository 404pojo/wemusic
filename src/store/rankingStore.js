import { observable, action, runInAction } from 'mobx'
export default class RankingStore{
    //全部榜单
    @observable allList = []
    @action.bound getRankingAllList(){
        const _this = this
        fetch('http://106.12.79.128:666/toplist')
        .then(body => body.json())
        .then(res => {
            runInAction(function() {
                _this.allList = res.list
            })
        })
    }
    //全部榜单内容摘要
    @observable allSection = [
        {
            tracks:[
                {first: ""}
            ]
        }
    ]
    @action.bound getRankingAllSection(){
        const _this = this
        fetch('http://106.12.79.128:666/toplist/detail')
        .then(body => body.json())
        .then(res => {
            runInAction(function() {
                _this.allSection = res.list
            })
        })
    }
    //获取榜单
    @observable playlist = {
        creator: {},
        nicknamw: "",
        tracks: []
    }
    @action.bound getRankingHot(id){
        const _this = this
        fetch(`http://106.12.79.128:666/top/list?idx=${id}`)
        .then(body => body.json())
        .then(res => {
            runInAction(function() {
                // console.log(res)
                _this.playlist = res.playlist
                _this.cart = res.playlist.tracks
                // console.log(_this.cart)
                _this.hotCoverImg = res.playlist.coverImgUrl
                _this.hotId = res.playlist.id
            })
        })
    }
   
    constructor(rootStore){
        this.rootStore=rootStore
    } 
}