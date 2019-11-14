import React from 'react';
import './streamingVideo.css';

class StreamingVideo extends React.Component {

	constructor() {
		super();
		this.localVideoRef = React.createRef();
		this.state = {
			imageCapture: '',
			url: '',
			stream: '',
			isOpenedVideo: true
		};

		this.takePhoto = this.takePhoto.bind(this);
		this.clearUrl = this.clearUrl.bind(this);
		this.backToStartPage = this.backToStartPage.bind(this);
	}

	componentDidMount() {
		navigator.mediaDevices
			.getUserMedia({ 
				video: true,
				audio: false 
			})
			.then(stream => {
				this.localVideoRef.current.srcObject = stream;

				const mediaStreamTrack = stream.getVideoTracks()[0];
				this.setState({
					stream: stream,
					imageCapture: new ImageCapture(mediaStreamTrack)
				});                
			})
			.catch(err => {
				console.error('getUserMedia() error: ', err);
			});
	}

	takePhoto() {
		const { imageCapture, stream } = this.state;
		if (stream) {
			imageCapture.takePhoto()
				.then(blob => {
					this.setState({
						url: URL.createObjectURL(blob)
					});
					this.props.passPhotoToHistory(this.state.url);
					this.clearUrl();
				})
				.catch(err => {
					console.error('takePhoto() error:', err);
				});
		}
	}

	clearUrl() {
		this.setState(prevState => ({
			url: URL.revokeObjectURL(prevState)
		}));
	}

	backToStartPage() {
		const { stream } = this.state;
		if (stream) {
			stream.getVideoTracks()
				.forEach(track => track.stop());
		}
		this.setState({
			isOpenedVideo: false
		});
	}

	componentDidUpdate(_prevProps, prevState) {
		if (this.state.isOpenedVideo !== prevState.isOpenedVideo) {
			this.props.onCloseCamera(this.state.isOpenedVideo);
		}
	}

	render() {
		return (
			<>
				<div className="stream_video">
					<video 
						className="video"
						ref={this.localVideoRef}
						autoPlay
					>
					</video>
				</div>
				<div className="buttons">
					<button 
						className="btn btn--success"
						onClick={this.takePhoto}
					>
						Capture
					</button>
					<button 
						className="btn btn--light" 
						onClick={this.backToStartPage}
					>
						Back
					</button>
				</div>
			</>
		)
	}
}

export default StreamingVideo;