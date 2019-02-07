import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, withRouter } from 'react-router-dom';

function Nav(props) {
	return (
		<nav>
				<Drawer
					open={true}
					variant="permanent"
					anchor="left"
				>
				<MenuList>
					<Link to="/give-consent" style={{textDecoration:'none'}}>
						<MenuItem selected={props.location.pathname === '/give-consent'}>
							<span>Give Consent</span>
						</MenuItem>
					</Link>
					<Link to="/consents" style={{textDecoration:'none'}}>
						<MenuItem selected={props.location.pathname === '/consents'}>
							<span>Collected Consents</span>
						</MenuItem>
					</Link>
				</MenuList>
			</Drawer>
	</nav>
	)
}

export default withRouter(Nav)
