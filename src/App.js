import React, { Component } from 'react';
import './app.css';

import StreamingVideo from './components/streaming-video-component/StreamingVideo';
import DisconnectedStream from './components/disconnected-stream-component/DisconnectedStream';
import History from './components/history-component/History'

class App extends Component {

	constructor() {
		super();

		this.state = {
		  isStartVideo: false,
		  listImageSrc: [],
		  amountPhoto: ''
		}

		this.openCamera = this.openCamera.bind(this);
		this.getPhoto = this.getPhoto.bind(this);
		this.closeCamera = this.closeCamera.bind(this);
		this.removeAllPhoto = this.removeAllPhoto.bind(this);
	}
	  
	openCamera(value) {
		this.setState({
			isStartVideo: value
		});
	}

	getPhoto(value) {
		this.setState({
			listImageSrc: [...this.state.listImageSrc, value],
			amountPhoto: this.state.listImageSrc.length + 1
		});
	}

	closeCamera(value) {
		this.setState({
			isStartVideo: value
		});
	}

	removeAllPhoto() {
		this.setState(prevState => ({
			listImageSrc: prevState.listImageSrc.splice(0, prevState.length)
		}));
	}

	render() {
		const { isStartVideo } = this.state;
		let stream;
		if (!isStartVideo) {
			stream = <DisconnectedStream
						amountPhoto = { this.state.amountPhoto }
						onStartVideo = { this.openCamera }
						removePhoto = { this.removeAllPhoto }
					/>;
		} else {
			stream = <StreamingVideo
						passPhotoToHistory = { this.getPhoto }
						onCloseCamera = { this.closeCamera }
					/>;
		}

		return (
			<div className="container">
				<div className="app">
					<div className="block-stream">
						{ stream }
					</div>
					<History 
						listImageSrc = { this.state.listImageSrc }
					/>
				</div>
			</div>
		);
	}
}

export default App;