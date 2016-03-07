import React from 'react';

const style = (feedback) => {
	return {
		container: {
			width: '30%',
			height: 'auto',
			backgroundColor: feedback.cResp ? '#3ab398' : '#ff8c01',
			color: '#ffffff',
			padding: '20px 25px',
			position: 'absolute',
			top: '0px',
			right: '0px',
			transition: 'all 0.3s ease',
			transform: `translateX(${feedback.visible ? 0 : 100}%)`
		},
		header: {
			fontSize: '24px',
			fontWeight: 'bold',
			margin: '0',
			marginBottom: '15px',
		},
		body: {
			margin: '0',
			padding: '0'
		}
	};
};

const Feedback = ({ feedback }) => {
	const styles = style(feedback);

	return (
		<div style={styles.container}>
			<h4 style={styles.header}>{feedback.header}</h4>
			<p style={styles.body}>{feedback.body}</p>
		</div>
	);
};

export default Feedback;