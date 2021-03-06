import {observable,action,runInAction} from 'mobx'
export default class songListStore{
    @observable cart=[]
    @observable songs=[]
    @observable creator=[]
    @observable tags=[]
    @observable description=[]
    @observable playCount=[]
    
    @action.bound getsongList(id){
        const _this=this
        fetch(`http://106.12.79.128:666/playlist/detail?id=${id}`)
        .then(body=>body.json())
        .then(res=>{
            // console.log(_this)
            runInAction(function(){
                _this.cart=res.playlist
                _this.songs=res.playlist.tracks
                _this.creator=res.playlist.creator
                _this.tags=res.playlist.tags
                _this.description=res.playlist.description.split("\n")
                _this.playCount=res.playlist.playCount
            })
        })
    }
    constructor(rootStore){
        this.rootStore=rootStore
    } 
}