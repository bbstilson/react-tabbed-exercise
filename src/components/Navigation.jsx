import React from 'react';

const style = () => {
	return {
		container: {
			width: '95%',
			height: '50px',
			position: 'absolute',
			bottom: '20px',
			left: '2.5%'
		},
		button: {
			height: '50px',
			width: '80px',
			backgroundColor: '#ffffff',
			color: '#305c5f',
			flexFlow: 'column nowrap',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer'
		},
		buttonLeft: function () {
			return {
				...this.button,
				float: 'left',
				display: 'flex'
			};
		},
		buttonRight: function () {
			return {
				...this.button,
				float: 'right',
				display: 'flex'
			};
		}
	};
};

const Navigation = ({
	navigate, position, range, qState
}) => {
	const qComplete = qState[position].complete;
	const styles = style();

	return (
		<div style={styles.container}>
			{
				position === 0 ?
				null:
				<div
					style={styles.buttonLeft()} 
					onClick={() => {
						navigate(-1);
					}}>
					<span>Prev</span>
				</div>
			}
			{
				position === range || !qComplete ?  
				null :
				<div
					style={styles.buttonRight()} 
					onClick={() => {
						navigate(+1);
					}}>
					<span>Next</span>
				</div>
			}
		</div>
	);
};

export default Navigation;