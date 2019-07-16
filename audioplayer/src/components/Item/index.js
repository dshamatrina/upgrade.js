import React from 'react';

import './styles.css';

export default function Item(props) {
	const { className="", song, duration } = props;
	return (
		<div className={`${className}item _track `}>
			<div className="item_play _item_play">
				<i className="fas fa-play" />
				<i className="fas fa-pause" />
			</div>
			<div className="item_name _name">{song}</div>
			<div className="item_duration _duration">{duration}</div>
		</div>
	);
}
