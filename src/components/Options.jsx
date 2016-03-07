import React from 'react';

const style = () => {
	return {
		component: {
			height: '100%',
			width: '20%',
			display: 'inline-block',
			verticalAlign: 'top',
		},
		container: {
			height: '100%',
			display: 'flex',
			flexFlow: 'column nowrap',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '0 5px'
		},
		tab: {
			defaults: {
				height: 'calc((100% / 5) - 5px)',
				width: '100%',
				boxSizing: 'border-box',
				display: 'flex',
				flexFlow: 'column nowrap',
				justifyContent: 'center',
				alignItems: 'center',
				transition: 'background-color 0.15s ease'
			},
			active: function () {
				return {
					...this.defaults,
					backgroundColor: '#2c5b5f',
					color: '#ffffff'
				};
			},
			inactive: function () {
				return {
					...this.defaults,
					cursor: 'pointer',
					backgroundColor: '#3ab398'
				};
			}
		}
	};
};

const Options = ({
	tabs, selected, selectNew, qState, question
}) => {
	const styles = style();
	const tabsOptions = tabs.map(tab => {
		let tabStyle = selected === tab ? styles.tab.active() : styles.tab.inactive();
		
		return (
			<div 
				key={tab} 
				style={tabStyle} 
				onClick={() => {
					if (!qState[question].complete) {
						selectNew(tab);
					}
				}}>
				<span>{tab}</span>
			</div>
		);
	});

	return (
		<div style={styles.component}>
			<div style={styles.container}>
				{tabsOptions}
			</div>
		</div>
	);
};

export default Options;