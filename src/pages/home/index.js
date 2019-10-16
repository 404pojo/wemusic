import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RankingList from './rankingList'
import Recommend from './recommend'
import Search from './search'
import './index.css';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import { Route, Link, NavLink, Redirect, Switch, withRouter } from 'react-router-dom'

const tabs = [
    { title: <Badge>推荐音乐</Badge> },
    { title: <Badge>热歌榜</Badge> },
    { title: <Badge>搜索</Badge> },
];
@withRouter
class Home extends React.Component {
    render() {
        return (

            <div style={{height:'100%'}} className="home-box">
                <Header></Header>
                <div style={{height:'79vh'}} className="talbes-box">
                    <Tabs ref='tabs' tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => { 
                           /*  console.log('onChange', index, tab); */
                      /*   if(index==0){              
                                this.props.history.push({pathname:'/home/recommend'})                                                             
                        }else if(index==1){
                            this.props.history.push({pathname:'/home/rankingList'})
                        }else{
                            this.props.history.push({pathname:'/home/search'})
                        }  */
                         }}
                        onTabClick={(tab, index) => { 
                            console.log('onTabClick', index, tab);
                            
                        }}
                    >

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '979px', backgroundColor: '#fff' }}>
                            
                        <Recommend/>
                           {/*  <Route path="/home/recommend" componenet={Recommend}>                             
                            </Route> */}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '979px', backgroundColor: '#fff' }}>
                         <RankingList/>  
                        {/* <Route path="/home/rankingList" componenet={RankingList}></Route>  */}
                            {/* <RankingList></RankingList> */}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', height: '979px', backgroundColor: '#fff' }}>
                       {/*  <Route path="/home/search" componenet={Search}></Route>  */} 
                            <Search />
                        </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Home