import React from 'react';
import Item from '../Item';

import './styles.css';

export default function Playlist() {
	return (
		<section className="playlist">
			<div className="playlist_list _playlist">
				<Item className="item__active " song="Tuesday (Original Mix) (feat. Danelle Sandoval) - Burak Yeter" duration="04:05"/>
				<Item song="Suffer (feat. SKOTT) - Petit Biscuit" duration="03:29"/>
				<Item song="Time to Pretend - MGMT" duration="04:21"/>
			</div>
		</section>
	);
}
