import {observable} from 'mobx'
export default class SearchStore{
    @observable cart=[]
    constructor(rootStore){
        this.rootStore=rootStore
    } 
}