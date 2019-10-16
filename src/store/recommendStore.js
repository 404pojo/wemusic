import {observable,runInAction,action} from 'mobx'
// 初始化属性是一个非常重要的步骤，可以减少后期代码的错误
// 发送异步请求，使用runInAction函数进行处理
// 异步请求：1.请求发起时  2.请求结束时
export default class RecommendStore{
    @observable product = [{id:1,inventory:1,title:"sdsdsd",price:"12312"}]
    @observable song = [{id:1,inventory:1,title:"sdsdsd",price:"12312"}]
    @action.bound getList(){
        const _this = this;
        // 1.请求发起时
        fetch("http://106.12.79.128:666/top/playlist")
        .then(body=>body.json())
        .then(res=>{
            // 2.请求结束 修改状态
            runInAction(function(){
                // console.log(res);
                _this.product = res.playlists
            })
        })
    }
    @action.bound getSong(){
        const _this = this;
        // 1.请求发起时
        fetch("http://106.12.79.128:666/top/song?type=0")
        .then(body=>body.json())
        .then(res=>{
            // 2.请求结束 修改状态
            runInAction(function(){
                // console.log(res);
                _this.song = res.data;
            })
        })
    }
   structor(rootStore){
        this.rootStore=rootStore
    } 
}