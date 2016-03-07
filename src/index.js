import React from 'react';
import { render } from 'react-dom';
import Exercise from './components/Exercise';
import data from './data';

render(
	<Exercise data={data} />, 
	document.getElementById('root')
);