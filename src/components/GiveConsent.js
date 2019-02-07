import '../App.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { handleAddConsent } from '../actions';
import FadeIn from 'react-fade-in';
import { NEWSLETTERS, VISITS, TARGETED_ADS } from '../utils/constants';

class GiveConsent extends Component {
	state = {
		name: '',
		email: '',
		newsletters: false,
		targetedAds: false,
		visits: false
	}

	handleNameChange = name => event => {
		this.setState({ [name]: event.target.value }, () => {

		});
	};

	handleEmailChange = name => event => {
		this.setState({ [name]: event.target.value }, () => {
		});
	};	

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked }, () => {
		});
	};

	render() {
		const { handleSubmit, history} = this.props
		return (
			<Paper className="mainPaperWrapper" style={{borderRadius: '4px'}}>
				<form onSubmit={(e) => handleSubmit(e, 
				this.state.name,
				this.state.email, 
				this.state.newsletters, 
				this.state.targetedAds, 
				this.state.visits,
				history)}>
					<TextField onChange={this.handleNameChange('name')} 
						placeholder="Name" 
						style={{margin: '5%'}} />
					<TextField onChange={this.handleEmailChange('email')} 
						placeholder="E-mail address" 
						type='email' 
						style={{margin: '5%'}} />
					<Paper className="innerPaperWrapper">
						<FormControl component="fieldset">
							<FormLabel component="legend">I agree to:</FormLabel>
								<FadeIn>
									<FormGroup>
										<FormControlLabel
										control={
											<Checkbox 
											onChange={this.handleChange('newsletters')} 
											value="newsletters" />
										}
										label="Receive Newsletters"
										/>
										<FormControlLabel
										control={
											<Checkbox 
											onChange={this.handleChange('targetedAds')} 
											value="targetedAds" />
										}
										label="Be shown targeted ads"
										/>
										<FormControlLabel
										control={
											<Checkbox
											onChange={this.handleChange('visits')}
											value="visits"
											/>
										}
										label="Contribute to anonymous visits statistics"
										/>
									</FormGroup>
								</FadeIn>
							</FormControl>
					</Paper>
					<Button disabled={(this.state.name === '' || this.state.email === '') 
					|| 
					(!this.state.newsletters && 
					!this.state.targetedAds &&
					!this.state.visits
					)} type="submit" style={{width: '80%', background: '#47ad53', borderRadius: '4px'}}>
						Give Consent
					</Button>
				</form>
			</Paper>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	  handleSubmit: (e, name, email, newsletters, targetedAds, visits, history) => {
			e.preventDefault();
			const consentFor = [];
			if(newsletters) consentFor.push(NEWSLETTERS);
			if(visits) consentFor.push(VISITS);
			if(targetedAds) consentFor.push(TARGETED_ADS);
			const consent = {
				name,
				email,
				consentFor
			}

			dispatch(handleAddConsent(consent)).then(() => {
				history.push('/consents')
			})
		}
	}
}

export default withRouter(connect(null, mapDispatchToProps)(GiveConsent))