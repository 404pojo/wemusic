import React from  'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RankingList from './rankingList'
import Recommend from './recommend'
import Search from './search'
import { Route,Link,NavLink,Redirect,Switch} from 'react-router-dom'
class Home extends React.Component{
    render(){
        return (
            <div>
                <Header></Header>
                home
                <Footer></Footer>
            </div>
        )
    }
}

export default Home