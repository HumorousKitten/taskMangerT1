import { Box, Chip, Stack } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Link } from 'react-router-dom'

import cl from './_taskItem.module.css'

export const TaskItem = ({id}) => {
	
	return (
		<Card sx={{backgroundColor: '#000000', color: '#ffffff', width: '300px', borderRadius: 4}}>
			<Link to = {`/task/${id}`}>
				<CardContent>
					<Stack direction = 'row' justifyContent='space-between' mb={2}>
						<Typography component = 'h3'>ZAgolovok</Typography>
						<Stack direction = 'row' spacing = {.5}>
							<DeleteIcon />
							<EditNoteIcon />
						</Stack>
					</Stack>
					<Typography component = 'p' className={cl.description}>Opisaniedfjsfjasl;fasklfsdfasfasdfasfasfd</Typography>
					<Stack direction = 'row' spacing = {1.5} mt={2}> 
						<Chip label='To Do' color='primary'/>  {/*по умолчанию To Do*/}
						<Chip label='Bug' color='primary'/> {/* если есть */}
						<Chip label='Low' color='primary'/> {/* если есть */}
					</Stack>
					{/* сделать их в ряд */}
				</CardContent>
			</Link>
		</Card>
	);
}
 
