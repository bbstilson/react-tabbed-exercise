import React from 'react';
import Question from './Question';

const style = (position) => {
	return {
		width: '100%',
		whiteSpace: 'nowrap',
		height: '100%',
		fontSize: '0',
		transition: 'all 0.5s ease',
		transform: `translateX(${position * -100}%)`
	};
}
const QuestionsContainer = ({
	content,
	position
}) => {
	const questions = content.map((question, idx) => 
		<Question 
			key={question.id}
			idx={idx}
			content={question} />
	);

	return (
		<div style={style(position)}>{questions}</div>
	);
}

export default QuestionsContainer;