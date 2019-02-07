import '../App.css';
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

function FourOhFour() {
	return (
		<Paper className='mainPaperWrapper'>
			<Typography color="primary">404. Oops! Wrong URL ? </Typography>

			<Button component={Link} to="/give-consent">
				Take me Home !
			</Button>
		</Paper>
	)
}

export default FourOhFour
