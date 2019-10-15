import React from 'react'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import './search.css';
import search from '../../../assets/search.svg'
import HotSearch from './searchCom/HotSearch'
import SearchResult from './searchCom/SearchResult'
import Match from './searchCom/Match'
import { observer, inject } from 'mobx-react'
import { autorun } from 'mobx'
@inject('searchStore')
@observer
class Search extends React.Component {
    //这里将双向数据绑定改为了在store中共享input搜索框数据
    //数据双向绑定
    inputValue(e) {
        let { TOGGLEPAGE,CHANGEVALUE } = this.props.searchStore
       /*  this.setState({
            value: e.target.value
        }) */
        CHANGEVALUE(e.target.value)
        //判断输入值,有值发请求并且修该切换页面的数据，切换页面
        if (e.target.value) {
            let { GETSEARCHSUGGEST } = this.props.searchStore
            GETSEARCHSUGGEST(e.target.value)
            TOGGLEPAGE('searchResult')
        } else {
            //如果没有输入值,即value为空,修改切换页面数据为hotSearch
            //这样就不会加载另两个页面
            TOGGLEPAGE('hotSearch')
        }
    }
    //点击x清除输入框值，会触发onchange事件
    clearValue() {
        let { TOGGLEPAGE,CHANGEVALUE } = this.props.searchStore
       /*  this.setState({
            value: ''
        }) */
        CHANGEVALUE('')
        TOGGLEPAGE('hotSearch')
    }
    render() {
        let { showResultOrMatch,value } = this.props.searchStore
        return (
            <div className='searchContainer'>
                <div className="bar6">
                    <div className="search"><img src={search} alt="" /></div>
                    <input type="text" placeholder="搜索歌曲、歌手、专辑"
                        value={value}
                        onChange={this.inputValue.bind(this)} />
                    <div className="last">
                        {/* 根据store中的value是否为空来判断来条件加载 */}
                        <span style={value ? { display: 'block' } : { display: 'none' }}
                            onClick={this.clearValue.bind(this)}>
                            X
                        </span>
                    </div>
                </div>
                {/* 根据store中的value是否为空来判断来条件加载 */}
                <div style={value ? { display: 'none' } : { display: 'block' }}>
                    <HotSearch></HotSearch>
                </div>
                {/* 根据store中的showResultOrMatch是否为空来判断来条件加载以下两个组件
                如果value为空时，会将该值改为 非searchResult、match */}
                <div style={showResultOrMatch == 'searchResult' ? { display: 'block' } : { display: 'none' }}>
                    <SearchResult value={value}></SearchResult>
                </div>
                <div style={showResultOrMatch == 'match' ? { display: 'block' } : { display: 'none' }}>
                    <Match></Match>
                </div>
            </div>
        )
    }
}

export default Search