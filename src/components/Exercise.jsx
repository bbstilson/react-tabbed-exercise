import React, { Component } from 'react';
import QuestionsContainer from './QuestionsContainer';
import Navigation from './Navigation';
import Options from './Options';
import Feedback from './Feedback';

export default class Exercise extends Component {
	constructor() {
		super();
		this.state = {
			position: 0,
			range: 0,
			selected: '',
			attemptNo: 0,
			qState: [],
			complete: false,
			feedback: {
				visible: false,
				header: '',
				body: '',
				cResp: false
			}
		};
	}

	navigate = (direction) => {
		const { position, range, qState, feedback, complete } = this.state;
		const currQuestion = qState[position];

		if (direction < 0 && position > 0 || direction > 0 && position < range ) {
			this.setState({
				position: position + direction,
				selected: qState[position + direction].complete ? qState[position + direction].answer : ''
			});
		}

		if (!complete) {
			this.setState({
				feedback: {
					...feedback,
					visible: false
				}
			});
		} else {
			this.setFeedback('Review:', currQuestion.feedback, true);
		}
	};

	incrementAttempt = (prev) => {
		this.setState({
			attemptNo: prev + 1
		});
	};

	showCorrectAnswer = (answer) => {
		this.setState({
			selected: answer
		});
	};

	setFeedback = (header, body, cResp = false) => {
		this.setState({
			feedback: {
				visible: true,
				header: header,
				body: body,
				cResp: cResp
			}
		});
	};

	setQuestionComplete = (idx) => {
		this.setState({
			qState: this.state.qState.map((q, i) => {
				if (i === idx) {
					return {
						...q,
						complete: true
					};
				} else {
					return q;
				}
			}),
			attemptNo: 0
		}, function () {
			const exerciseComplete = this.state.qState.every(q => q.complete);

			if (exerciseComplete) {
				this.setState({
					complete: true
				});
			}
		});
	};

	select = (choice) => {
		const { attemptNo, position } = this.state;
		const { 
			data: { 
				questions,
				cResp,
				iResp,
				fResp,
				iFeedback
			}} = this.props;
		const currQuestion = questions[position];

		this.setState({
			selected: choice
		});

		if (currQuestion.answer == choice) {
			this.setQuestionComplete(position);
			this.setFeedback(cResp, currQuestion.feedback, true);

		} else if (attemptNo === 0) {
			this.incrementAttempt(attemptNo);
			this.setFeedback(iResp, iFeedback);
		} else {
			this.setQuestionComplete(position);
			this.showCorrectAnswer(currQuestion.answer);
			this.setFeedback(fResp, currQuestion.feedback);
		}
	};

	style() {
		return {
			container: {
				width: '100%',
				height: '400px' // normally set to 100%
			},
			header: {
				marginBottom: '40px',
			},
			exercise: {
				width: '100%',
				height: '50%',
				minHeight: '300px',
				position: 'relative',
				overflow: 'hidden'
			},
			window: {
				width: '40%',
				height: '100%',
				overflow: 'hidden',
				display: 'inline-block',
				position: 'relative',
				verticalAlign: 'top',
				boxSizing: 'border-box',
			}
		};
	};

	componentWillMount() {
		const { data: { questions }} = this.props;

		this.setState({
			range: questions.length - 1,
			qState: questions.map(q => {
				return { 
					complete: false, 
					answer: q.answer,
					feedback: q.feedback,
					correct: true
				};
			})
		});	
	}

	render() {
		const { selected, position, range, qState, feedback } = this.state;
		const { data: { questions, tabs }} = this.props;
		const styles = this.style();

		return (
			<div style={styles.container}>
				<div style={styles.exercise}>
					<div style={styles.window}>
						<QuestionsContainer 
							content={questions}
							position={position} />
						<Navigation 
							qState={qState}
							navigate={this.navigate}
							position={position} 
							range={range} />
					</div>
					<Options 
						qState={qState}
						question={position}
						tabs={tabs} 
						selectNew={this.select} 
						selected={selected} />
					<Feedback
						feedback={feedback} />
				</div>
			</div>
		);
	}
}