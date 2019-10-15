import {observable} from 'mobx'
import { action } from '../../node_modules/mobx/lib/mobx'
export default class PlayerStore{
    @observable cart=[]
    constructor(rootStore){
        this.rootStore=rootStore
    } 
}