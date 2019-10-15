import React from 'react'
import './SearchResult.css'
import searchIcon from '../../../../assets/search.svg'
import { observer, inject } from 'mobx-react'
@inject('searchStore')
@observer
class SearchResult extends React.Component {
    //点击搜索下拉列表跳转至match页
    toMatchPage(keyword){
        let {TOGGLEPAGE,GETSEARCHRESULT,GETSEARCHSONGS, CHANGESEARCHVALUE} =this.props.searchStore
        TOGGLEPAGE('match') //切换页面至match（数据驱动）
        GETSEARCHRESULT(keyword) //发送请求获取专辑、歌手、mv信息
        GETSEARCHSONGS(keyword) //发送请求获取关键词相关所有歌曲
        CHANGESEARCHVALUE(keyword) //改变搜索框值为点击值
    }
    render() {
        let toRender;
        let { searchSuggest } = this.props.searchStore
        //条件渲染
        if (searchSuggest.length) {
            toRender = searchSuggest.map((item, index) => (
                <li key={index} onClick={this.toMatchPage.bind(this,item.keyword)}>
                    <i><img src={searchIcon} alt="" /></i>
                    <span>{item.keyword}</span>
                </li>
            ))
        }else{
            toRender=<span></span>
        }
        return (
            <div className="searchResult">
                <div className="searchResultKeywords">
                    <p>搜索"<span>{this.props.value}</span>"</p>
                </div>
                <ul>
                    {toRender}
                </ul>
                
            </div>
        )
    }
}
export default SearchResult