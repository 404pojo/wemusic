import {observable} from 'mobx'
export default class songListStore{
    @observable cart=[]
    constructor(rootStore){
        this.rootStore=rootStore
    } 
}