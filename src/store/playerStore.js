// <<<<<<< HEAD
import {observable,action,runInAction} from "mobx"
// import { action } from '../../node_modules/mobx/lib/mobx'
// =======
// import {observable} from 'mobx'
// import { action } from '../../node_modules/mobx/lib/mobx'
// >>>>>>> 93d9917a590371f8acdfeb845059a161c3ef0407
export default class PlayerStore{
    @observable cart=[{
        "id": 33894312,
        "url": "http://m10.music.126.net/20191012095053/55e61a1a4cb0fceed72d88866d7c311c/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3",
        "br": 320000,
        "size": 10691439,
        "md5": "a8772889f38dfcb91c04da915b301617",
        "code": 200,
        "expi": 1200,
        "type": "mp3",
        "gain": 0,
        "fee": 0,
        "uf": null,
        "payed": 0,
        "flag": 0,
        "canExtend": false,
        "freeTrialInfo": null,
        "level": "exhigh",
        "encodeType": "mp3"
    }];
    @observable songAlbum = []; // 歌曲专辑
    @observable songInfo = [];  // 歌曲信息
    @observable artist = "wf";  // 歌手名
    @observable musicId = [];   // 歌曲列表数组
    constructor(rootStore){
        this.rootStore=rootStore
    } 
    @action.bound getMusicUrl(id){
        const _this = this;
        // 1、请求发起时
        fetch(`http://106.12.79.128:666/song/url?id=${id}`)
        .then(body=>body.json())
        .then(res=>{
            // 2、请求结束 修改状态
            runInAction(function(){
                // console.log(res.data[0]);
                _this.cart = res.data[0];
                // console.log(_this.cart);
            })
        })
    }
    @action.bound getMusicInfo(id){
        const _this = this;
        // 1、请求发起时
        fetch(`http://106.12.79.128:666/song/detail?ids=${id}`)
        .then(body=>body.json())
        .then(res=>{
            // 2、请求结束 修改状态
            runInAction(function(){
                _this.songAlbum = res.songs[0].al;
                _this.songInfo = res.songs[0]
                _this.artist = res.songs[0].ar[0].name; 
            })
        })
    }

    @action.bound getMusicId(){
        const _this = this;
        fetch("http://106.12.79.128:666/personalized/newsong")
        .then(body=>body.json())
        .then(res=>{
            runInAction(function(){
                for(let item of res.result){
                    _this.musicId.push(item.id);
                }                
            })
        })
    }
}