import { observable, action, runInAction } from 'mobx'
import { getHotSearchApi, getSearchSuggestApi, getSearchResultApi, getSearchSongsApi, getMusicPlayerApi,getMusicDetailApi} from '../api'
export default class SearchStore {
    @observable value = ''//搜索框里的值
    @observable hotSearch = [{}] //热搜数组
    @observable historySearch = []//历史搜索

    @observable searchSuggest = [{}]//搜索建议 
    @observable showResultOrMatch = 'hotSearch'//展示搜索结果页或匹配页
    @observable showPlayer = ''//控制播放按钮展示图片的随机字符串
    @observable playSong = {
        id:  519504381,
        url: "http://m10.music.126.net/20191014212918/381412f3f53f82d8db86be91cdbd4b0f/ymusic/8709/4dc2/4eb1/ca5a461f5064c298276b49a48fb336dd.mp3",
        img:   "https://p2.music.126.net/5bxE1TjxdBVRXi9bxD9P1w==/18441009021326803.jpg",
        author:"Bob Dylan",
        name:"Blowin'in the Wind",
        playState: 'pause'
    }   //用于控制在底部组件播放的歌曲id
    @observable searchResult = {
        album: [
            {
                name: '',
                artist: {
                    
                }
            }
        ],
        artist: [
            {
                name: ''
            }
        ],
        mv: [
            {

            }
        ]
    } //搜索关键词，专辑、歌手、mv
    @observable searchSongs = [
        {
            name: '',
            artists: [
                {
                    name: '',
                    img1v1Url: ""
                }
            ],
            album: {
                name: ''
            }
        }
    ]//根据关键词所获取的相关所有歌曲


    constructor(rootStore) {
        this.rootStore = rootStore
    }
    //获取热搜数据
    @action.bound GETHOTSEARCH() {
        let _this = this
        getHotSearchApi()
            .then(res => {
                runInAction(function () {
                    _this.hotSearch = res.result.hots
                })
            })
    }
    //删除搜索记录
    @action.bound DELETEHISTORY(item) {
        let _this = this
        runInAction(function () {
            let index = _this.historySearch.indexOf(item)
            _this.historySearch.splice(index, 1)
        })
    }
    //获取搜索建议
    @action.bound GETSEARCHSUGGEST(keywords) {
        let _this = this
        getSearchSuggestApi(keywords)
            .then(res => {
                runInAction(function () {
                    if (res.result.allMatch) {
                        _this.searchSuggest = res.result.allMatch
                    } else {
                        _this.searchSuggest = []
                    }
                })
            })
    }
    //切换搜索结果页或者匹配页
    @action.bound TOGGLEPAGE(item) {
        let _this = this
        runInAction(function () {
            _this.showResultOrMatch = item
        })
    }
    //根据关键词搜索mv歌手专辑
    @action.bound GETSEARCHRESULT(keywords) {
        let _this = this
        getSearchResultApi(keywords)
            .then(res => {
                runInAction(function () {
                    if (res.result) {
                        _this.searchResult = res.result;
                    } else {
                        _this.searchSuggest = {}
                    }
                })
            })
    }
    //根据关键词搜索对应的所有歌曲
    @action.bound GETSEARCHSONGS(keywords) {
        let _this = this
        getSearchSongsApi(keywords)
            .then(res => {
                runInAction(function () {
                    if (res.result) {
                        _this.searchSongs = res.result.songs;
                    } else {
                        _this.searchSongs = []
                    }
                })
            })
    }
    //跳转至Match页子组件并修改state中搜索框中值value并修改历史记录
    @action.bound CHANGESEARCHVALUE(item) {
        let _this = this
        runInAction(function () {
            _this.changeSearchValue = item;
            _this.value = item
            //限制历史记录栈的数量始终<=10
            if (_this.historySearch.length < 10) {
                //如果历史记录栈中有该项，有则删除原来的，添加新的,没有正常添加
                let isexist = _this.historySearch.find((it) => item == it)
                if (isexist) {
                    let index = _this.historySearch.indexOf(item)
                    _this.historySearch.splice(index, 1)
                    _this.historySearch.unshift(item)
                } else {
                    _this.historySearch.unshift(item)
                }
            } else {
                _this.historySearch.pop()
                let isexist = _this.historySearch.find((it) => item == it)
                if (isexist) {
                    let index = _this.historySearch.indexOf(item)
                    _this.historySearch.splice(index, 1)
                    _this.historySearch.unshift(item)
                } else {
                    _this.historySearch.unshift(item)
                }
            }
        })
    }
    //在输入框中输入，或者点击输入框中的x时修改搜索框中的值
    @action.bound CHANGEVALUE(item) {
        let _this = this
        runInAction(function () {
            _this.value = item
        })
    }
    //控制点击播放按钮播放
    @action.bound PLAYSONG(randomStr, id, playerState) {
        let _this = this
        runInAction(function () {
            if (playerState == 'pause') {
                _this.showPlayer = randomStr
                getMusicPlayerApi(id)
                    .then(res => {
                        let _id=res.data[0].id;
                        getMusicDetailApi(_id)
                        .then(res2=>{
                            let obj = {
                                id: res.data[0].id,
                                url: res.data[0].url,
                                playState: 'player',
                                name:res2.songs[0].name,
                                author:res2.songs[0].ar[0].name,
                                img:res2.songs[0].al.picUrl
                            }
                            _this.playSong=obj
                        })
                    })
            } else {
                _this.showPlayer = ''
                getMusicPlayerApi(id)
                    .then(res => {
                        _this.playSong.playState='pause'
                        
                    })
            }
        })
    }
      //底部播放组件，点击暂停
      @action.bound PAUSEPLAYER(item) {
        let _this = this
        runInAction(function () {
            _this.playSong.playState=item;
            _this.showPlayer=''
        })
    }
}   