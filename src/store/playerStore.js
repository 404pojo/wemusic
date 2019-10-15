import {observable,action,runInAction} from "mobx"
// import { action } from '../../node_modules/mobx/lib/mobx'
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
    @observable songAlbum = [];
    @observable songInfo = [];
    @observable artist = "wf";
    constructor(rootStore){
        this.rootStore=rootStore
    } 
    @action.bound getMusicUrl(){
        const _this = this;
        // 1、请求发起时
        fetch("http://106.12.79.128:666/song/url?id=1395252835")
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
    @action.bound getMusicInfo(){
        const _this = this;
        // 1、请求发起时
        fetch("http://106.12.79.128:666/song/detail?ids=1395252835")
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
}