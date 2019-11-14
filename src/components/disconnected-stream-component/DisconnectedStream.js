import React from 'react';
import './disconnectedStream.css';

class DisconnectedStream extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpenedVideo: false
		};

		this.openCamera = this.openCamera.bind(this);
		this.removeAllPhoto = this.removeAllPhoto.bind(this);
	}

	openCamera() {
		this.setState({
			isOpenedVideo: true
		});
	}

	componentDidUpdate(_prevProps, prevState) {
		if (this.state.isOpenedVideo !== prevState.isOpenedVideo) {
			this.props.onStartVideo(this.state.isOpenedVideo);
		}
	}

	removeAllPhoto() {
		this.props.removePhoto();
	}

    render() {
		const { amountPhoto } = this.props;
		let colorClearBtn = amountPhoto 
				? 'btn--danger'
				: 'btn--disable';

        return (
			<>
				<div className="stream">
					<img 
						className="stream__img" 
						src="/img/photoGallery.png" alt="" 
					/>
				</div>
				<div className="buttons">
					<button 
						className="btn btn--success"
						onClick={ this.openCamera }
					>
						Open camera
					</button>
					<button 
						className={`btn ${colorClearBtn}`} 
						onClick={ this.removeAllPhoto }
					>
						Clear history
					</button>
				</div>
			</>
        );
    }
}

export default DisconnectedStream;