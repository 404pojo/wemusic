import React from  'react'
import './header.css'
import logo from '../assets/logo.png'
class Header extends React.Component{
    render(){
        return (
            <div className="header">
               <div className="logoAndName">
                   <img src={logo}/>
                   <span className="name">网易云音乐</span>
               </div>
            </div>
        )
    }
}

export default Header