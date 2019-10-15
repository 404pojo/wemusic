import React from 'react'
import './HotSearch.css'
import searchClock from '../../../../assets/searchClock.svg'
import { observer, inject } from 'mobx-react'
@inject('searchStore')
@observer
class Footer extends React.Component {
    componentDidMount() {
        //调用获取热搜异步请求action方法
        let { GETHOTSEARCH } = this.props.searchStore
        GETHOTSEARCH()

    }
    //点击x删除历史记录
    deleteHistory(item){
        let {DELETEHISTORY}= this.props.searchStore
        DELETEHISTORY(item)
    }
    //点击热搜、历史记录跳转至match页
    jumpToMatch(keyword){
        let {TOGGLEPAGE,GETSEARCHRESULT,GETSEARCHSONGS,CHANGESEARCHVALUE,CHANGEVALUE} =this.props.searchStore
        TOGGLEPAGE('match')//切换页面至match（数据驱动）
        GETSEARCHRESULT(keyword)//发送请求获取专辑、歌手、mv信息
        GETSEARCHSONGS(keyword)//发送请求获取关键词相关所有歌曲
        CHANGESEARCHVALUE(keyword)//改变搜索框值为点击值
    }
    render() {
        let { hotSearch, historySearch } = this.props.searchStore
        return (
            <div className="hotSearch">
                <p className="introduce">热门搜索</p>
                <ul className="SearchCenter">
                    {hotSearch.map((item, index) => (<li onClick={this.jumpToMatch.bind(this,item.first)} key={index}>{item.first}</li>))}
                </ul>
                <ul className="SearchBottom">      
                    {historySearch.map((item, index) => (
                        <li  key={index}>
                            <i className="searchClock"><img src={searchClock} alt="" /></i>
                            <div>
                                <span onClick={this.jumpToMatch.bind(this,item)}>{item}</span>
                                <i className="close" onClick={this.deleteHistory.bind(this,item)}>X</i>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Footer