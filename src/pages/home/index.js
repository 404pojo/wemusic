import React from  'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RankingList from './rankingList'
import Recommend from './recommend'
import Search from './search'
import './index.css';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { Route,Link,NavLink,Redirect,Switch} from 'react-router-dom'

const tabs = [
    { title: <Badge>推荐音乐</Badge> },
    { title: <Badge>热歌榜</Badge> },
    { title: <Badge>搜索</Badge> },
  ];
class Home extends React.Component{
    render(){
        return (
<<<<<<< HEAD

                <div>
                    <Header></Header>
                    <Route path="/home/ranking" component={RankingList}></Route>
                    <Footer></Footer>
                </div>

=======
            <div>
                <Header></Header>              
                    <div>
                        <Tabs tabs={tabs}
                        initialPage={1}
                        onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '979px', backgroundColor: '#fff' }}>
                            Content of first tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '979px', backgroundColor: '#fff' }}>
                            
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', height: '979px', backgroundColor: '#fff' }}>
                           <Search/>
                        </div>
                        </Tabs>
                        <WhiteSpace />
                    </div>
                <Footer></Footer>
            </div>
>>>>>>> 93d9917a590371f8acdfeb845059a161c3ef0407
        )
    }
}

export default Home