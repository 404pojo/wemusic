import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
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
          <Route path="/player" component={Player} />
          <Route path="/songList" component={SongList} />
          <Route path="/ranking/listDetails/:id" component={rankingSongList}></Route>
          <Route component={Page404}/>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
