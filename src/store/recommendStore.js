import {observable,runInAction,action} from 'mobx'
export default class RecommendStore{
   structor(rootStore){
        this.rootStore=rootStore
    } 
}