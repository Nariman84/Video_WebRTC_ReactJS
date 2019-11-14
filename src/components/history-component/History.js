import React from 'react';
import './history.css';

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			captureListSrc: this.props.listImageSrc
		};
	}

	componentDidUpdate(prevProps, _prevState) {
		if (this.props.listImageSrc !== prevProps.listImageSrc) {
			this.setState({
				captureListSrc: this.props.listImageSrc
			});
		}
	}

	render() {
		const { captureListSrc } = this.state;
		let imgsSrc = captureListSrc.map(
			(imageSrc, index) => (
				<div className="col-lg-3 col-md-4 col-sm-6 col-12 wrap-capture" key={`id_${index}`}>
					<img src={imageSrc} className="capture" alt="capture" />
				</div>
			)
		);

		return (
			<div className="row history_list">
				{ imgsSrc }
			</div>
		)
	}
}

export default History;