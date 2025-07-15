import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Chip, Stack } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';


import { ITask } from '@/shared/types/types';
import { colorMap } from '@/shared/constants/colorMap';

import { useTaskStore } from '@/store/useTasksStore';

import cl from './_taskItem.module.css'



interface ITaskItem {
	task: ITask
}

export const TaskItem: FC<ITaskItem> = ({task}) => {
	const deleteTask = useTaskStore(state => state.deleteTask)
	
	return (
		<Card sx={{backgroundColor: '#000000', color: '#ffffff', width: '300px', borderRadius: 4}}>
			<Link to = {`/task/${task.id}`} className={cl.link}>
				<CardContent>
					<Stack direction = 'row' justifyContent='space-between' mb={2}>
						<Typography component = 'h3'>{task.title}</Typography>
						<Stack direction = 'row' spacing = {.5}>
							<DeleteIcon onClick = {(e: React.MouseEvent) => {
								e.preventDefault()
								deleteTask(task.id)
							}}/>
							<EditNoteIcon />
						</Stack>
					</Stack>
					<Typography component = 'p' className={cl.description}>{task.description}</Typography>
					<Stack direction = 'row' spacing = {1.5} mt={2}> 
						<Chip label={task.status} color = {colorMap.status[task.status || 'To Do']}/> 
						{task.category ? <Chip label={task.category} color={task.category ? colorMap.category[task.category] : undefined}/> : null}
						{task.priority ? <Chip label={task.priority} color={task.priority ? colorMap.priority[task.priority] : undefined}/> : null}
					</Stack>
				</CardContent>
			</Link>
		</Card>
	);
}
 
