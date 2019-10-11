import rankingStore from './rankingStore'
import playerStore from './playerStore'
import recommendStore from './recommendStore'
import songListStore from './songListStore'
import searchStore from './searchStore'
//mobx的store的分离和vue没有什么区别，每个需要保存应用状态的页面有其对应的页面store

export default class Store {
    constructor(){
        this.rankingStore=new rankingStore(this)
        this.playerStore=new playerStore(this)
        this.recommendStore=new recommendStore(this)
        this.songListStore=new songListStore(this)
        this.searchStore=new searchStore(this)
    }
}
//在这里最后导出的Store类的实例的属性，是单个页面store对象，
//而每个页面自己对应的store的实例对象上的属性，就是被观察的数据和action之类，包括Store类的实例
//这样每个页面仓库件就可以通过根Store ，访问到其它页面store，仓库件就可以做到数据的联动