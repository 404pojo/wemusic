import {observable} from 'mobx'
export default class RankingStore{
    @observable cart=[]
    constructor(rootStore){
        this.rootStore=rootStore
    } 
}