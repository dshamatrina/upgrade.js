import React from 'react';
import Main from '../Main';
import Footer from '../Footer';

import './styles.css';

export default function Player() {
	return (
		<div className="player _player">
					<audio src="data/track/94B797F4236A69F5CD7708465AC1F18D.mp3" className="_audio"></audio>
					<header className="player_header"></header>
					<Main />
					<Footer />
			</div>
	)
}