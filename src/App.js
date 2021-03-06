import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/home'
import Player from './pages/player'
import SongList from './pages/songList'
import rankingSongList from './pages/home/rankingList/listDetails'
import Page404 from './pages/page404'
import './assets/css/reset.css'
function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path='/home' component={Home} />
          <Route path="/player/:id" component={Player} />
          <Route path="/songList/:id" component={SongList} />
          <Route path="/ranking/listDetails/:id" component={rankingSongList}></Route>
          <Redirect from='/' to="/home"></Redirect>
          <Route component={Page404}/>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
