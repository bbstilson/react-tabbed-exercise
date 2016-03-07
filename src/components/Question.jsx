import React from 'react';

const style = () => {
	return {
		panel: {
			width: '100%',
			height: '100%',
			color: '#0d3a3f',
			backgroundColor: '#a0d6cb',
			display: 'inline-block',
			boxSizing: 'border-box',
			verticalAlign: 'top',
			position: 'relative',
			fontSize: '16px',
			whiteSpace: 'normal',
			padding: '20px 20px 80px'
		},
		header: {
			margin: '0px 0 10px'
		}
	};
};

const Question = ({
	content, 
	idx
}) => {
	const styles = style();
	return (
		<div style={styles.panel}>
			<p style={styles.header}>
				Question {idx + 1} of 5
			</p>
			{content.text}
		</div>
	);
}

export default Question;