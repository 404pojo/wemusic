import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/home'
import Player from './pages/player'
import SongList from './pages/songList'
import Page404 from './pages/page404'
function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route path='/home' component={Home} />
          <Route path="/player" component={Player} />
          <Route path="/songList" component={SongList} />
          <Route component={Page404}/>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
