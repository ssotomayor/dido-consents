import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import middleware from '../middleware';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import GiveConsent from '../components/GiveConsent';

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

describe('Components Tests', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<Provider store={store}>
			<MuiThemeProvider theme={theme}>
			<App />
			</MuiThemeProvider></Provider>, div)
		ReactDOM.unmountComponentAtNode(div);
	});
	
	configure({adapter: new Adapter()});
	test('Initial state of GiveConsent should be empty string and false', () => {
		
		// Using .WrappedComponent as this component is wrapped within withRouter
		// Enzyme allows you to easily mount a React component
		const wrapper = shallow(<GiveConsent.WrappedComponent />);
	
		expect(wrapper.state().name).toEqual('');
		expect(wrapper.state().email).toEqual('');
		expect(wrapper.state().newsletters).toEqual(false);
		expect(wrapper.state().visits).toEqual(false);
		expect(wrapper.state().targetedAds).toEqual(false);
	});
})
