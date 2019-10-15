import {observable,runInAction,action} from 'mobx'
export default class RecommendStore{
   constructor(rootStore){
        this.rootStore=rootStore
    } 
}