import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import MainScroll from '../components/MainScroll/MainScroll';
import './App.css';

const spotifyApi = new SpotifyWebApi();
function FollowedArtists({artists}) {
  return artists.map(artist => {
    return(
      <li>{artist}</li>
    );
  })
}
class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token

    // Set access token with retrieved params
    if (token) {
      spotifyApi.setAccessToken(token); 
    }

    this.state = {
      loggedIn : token ? true : false,
      nowPlaying : { name: 'Not Checked', albumArt: ''},
      followedArtists : []
    }
  }
  
  // Getting params (token)
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  // Now Playing data getter function
  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        });
      });
  }

  // Getting followed artists 
  getFollowedArtists() {
    spotifyApi.getFollowedArtists()
      .then((response) => {
        var artistList = [];
        var i;
        for (i = 0; i < response.artists.items.length; i++) {
          artistList.push(response.artists.items[i].name);
        }
        this.setState({
          followedArtists : artistList
        });
        console.log(this.state.followedArtists);
      });
  }

  render() {
    return (
      <div className="main-container">
        <div>
          {/* <UserInfo/> */}
        </div>
        <MainScroll/>
      </div>

      // <div className='App'>
      //   <a href='http://localhost:8888'>Login to Spotify</a>
      //   <div>
      //     Now Playing: { this.state.nowPlaying.name }
      //   </div>
      //   <div>
      //     <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
      //   </div>
      //   <div>
      //     <h3>Artists that I follow:</h3>
      //     <ul>
      //       <FollowedArtists artists={this.state.followedArtists}/>
      //     </ul>
      //   </div>
      //   { 
      //     this.state.loggedIn && 
      //     <button onClick={() => this.getNowPlaying()}>
      //       Check Now Playing
      //     </button>
      //   }
      //   { 
      //     this.state.loggedIn && 
      //     <button onClick={() => this.getFollowedArtists()}>
      //       Get Followed Artists
      //     </button>
      //   }
      // </div>
    );
  }
}

export default App;
