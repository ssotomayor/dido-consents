import '../App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { NEWSLETTERS, TARGETED_ADS, NEWSLETTERS_PRETTY, TARGETED_ADS_PRETTY, VISITS, VISITS_PRETTY } from '../utils/constants';

class ConsentsList extends Component {

	state = {
		currentPage: 1,
		consentsPerPage: 2
		};

	handleClick(event) {
		this.setState({
			currentPage: Number(event.target.id)
		});
	}

	render() {
		const { currentPage, consentsPerPage } = this.state;
		const { consents } = this.props;

		const indexOfLastConsent = currentPage * consentsPerPage;
		const indexOfFirstConsent = indexOfLastConsent - consentsPerPage;
		const currentConsents = consents.slice(indexOfFirstConsent, indexOfLastConsent);

		const renderConsents = currentConsents.map(({name, email, consentFor}, index) => {
			return <tr key={index}>
				<td>{name}</td>
				<td>{email}</td>
				<td>{consentFor.join(', ')
				.replace(NEWSLETTERS, NEWSLETTERS_PRETTY)
				.replace(TARGETED_ADS, TARGETED_ADS_PRETTY)
				.replace(VISITS, VISITS_PRETTY)}
				</td>
			</tr>
		});

		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(consents.length / consentsPerPage); i++) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			return (
			<li
				key={number}
				id={number}
				onClick={(e) => this.handleClick(e)}
			>
				{number}
			</li>
			);
		});

		return (
			<div>
				<Paper className='mainPaperWrapper'>
					<div style={{paddingTop: '10px'}}>
						<table cellSpacing="5" cellPadding="5" border='1' className='table'>
							<tbody>
								<tr>
									<th>Name</th>
									<th>E-mail</th>
									<th>Consent given for</th>
								</tr>
								{renderConsents}
							</tbody>
						</table>
					</div>
					<ul id="page-numbers">
						{renderPageNumbers}
					</ul>
				</Paper>
		</div>
		)
	}
}

const mapStateToProps = ({consents}) => {
	return {
		consents: consents ? consents : []
	}
}

export default connect(mapStateToProps)(ConsentsList)