import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import "@babel/polyfill";

//COMPONENTS
import App from './components/App';
import moment from 'moment';

//MAIN STYLE
// import './styles/main.scss'

moment.locale('en');

const render = (Component, isLoggedIn, locale, user) => {
	ReactDOM.render(
		<AppContainer>
			<Component  />
		</AppContainer>, document.getElementById('root'));
}

render(App);

if (module.hot)  module.hot.accept('./components/App', () => render(App));