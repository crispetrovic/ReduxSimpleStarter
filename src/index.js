import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import App from './components/app';
import reducers from './reducers';

const API_KEY = 'AIzaSyB-_6buLg8Z_0KiVVGOuf2nugY0xRB_sVA';


const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('kittens');
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

        render(){
            const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
        <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} />
        </div>
    );
   }
}

ReactDOM.render(<App />, document.querySelector('.container'));
