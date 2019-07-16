import React from 'react';

import './styles.css';

export default function Footer() {
	return (
		<footer className="player_footer">
			<section className="controls">
				<button className="control _actionPrev">
					<i className="fas fa-step-backward" />
				</button>
				<button className="control control__play _actionPlayPause">
					<i className="fas fa-play" />
					<i className="fas fa-pause" />
				</button>
				<button className="control _actionNext">
					<i className="fas fa-step-forward" />
				</button>
				<div className="progress">
					<div className="progress_value _progress" style={{ width: '0.71%' }} />
				</div>
				<button className="control control__mute _actionMute">
					<i className="fas fa-volume-mute" />
				</button>
				<button className="control control__random _actionRandom">
					<i className="fas fa-random" />
				</button>
				<button className="control control__repeat _actionRepeat">
					<i className="fas fa-redo-alt" />
				</button>
			</section>
		</footer>
	);
}
