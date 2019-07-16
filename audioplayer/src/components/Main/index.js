import React from 'react';
import Track from '../Track';
import Playlist from '../Playlist';

import './styles.css';

export default function Main() {
	return (
		<main className="main">
			<Track />
			<Playlist />
		</main>
	);
}
