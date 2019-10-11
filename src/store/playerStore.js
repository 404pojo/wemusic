import {observable} from 'mobx'
export default class PlayerStore{
    @observable cart=[]
    constructor(rootStore){
        this.rootStore=rootStore
    } 
}