import './App.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FourOhFour from './components/FourOhFour';
import Nav from './components/Nav';
import LoadingBar from 'react-redux-loading';
import GiveConsent from './components/GiveConsent';
import Helmet from 'react-helmet';
import { handleInitialData } from './actions/';
import ConsentsList from './components/ConsentsList';

class App extends Component {

	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
				<Fragment>
					<Nav />
					<LoadingBar /> 
					<div className="App">
					<Helmet>
						<style>{'body { background-color: #333333 }'}</style>
					</Helmet>
							{
							this.props.loading === true 
							? null
							: <Fragment>
								<Switch>
									<Route exact path='/give-consent' component={GiveConsent} />
									<Route exact path='/consents' component={ConsentsList} />
									<Route exact path='/' component={ConsentsList} />
									<Route component={FourOhFour} />
								</Switch>
							</Fragment>
							}
					</div>
				</Fragment>
			</Router>
		)
	}
}

const mapStateToProps = () => {
	return {
		loading: false
	}
}

export default connect(mapStateToProps)(App)