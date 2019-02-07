import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import middleware from './middleware'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers'
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

const store = createStore(reducers, middleware);

function getTheme(theme) {
	return createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: orange,
		secondary: green,
		type: theme.paletteType,
		background: {
				default: theme.paletteType === 'light' ? '#000' : '#fff',
			},
		},
		shape: {
			borderRadius: '10%'
		}
		})
	}

const theme = getTheme({
	paletteType: 'dark',
})

ReactDOM.render(
<Provider store={store}>
<MuiThemeProvider theme={theme}>
<App />
</MuiThemeProvider></Provider>, document.getElementById('root'))