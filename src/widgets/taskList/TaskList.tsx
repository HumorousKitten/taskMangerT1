import { Grid } from '@mui/material'

import { TaskItem } from '../../features/taskItem/TaskItem'
import { CustomButton as AddTaskBtn } from '../../shared/UI/button/Button'
import { PlusIcon } from '../../shared/icons/plusIcon/PlusIcon'

export const TaskList = () => {
	return (
		<Grid container spacing={2} justifyContent='center'>
			<Grid>
				<TaskItem id={1}/>
			</Grid>
			<Grid>
				<TaskItem id={2}/>
			</Grid>
			<Grid>
				<TaskItem id={3}/>
			</Grid>
			<Grid>
				<TaskItem id={4}/>
			</Grid>
			<Grid>
				<TaskItem id={5}/>
			</Grid>
			<Grid>
				<TaskItem id={6}/>
			</Grid>
		
			<Grid>
				<TaskItem id={7}/>
			</Grid>

			<Grid>
				<TaskItem id={8}/>
			</Grid>

			<Grid>
				<TaskItem id={9}/>
			</Grid>

			<Grid>
				<TaskItem id={10}/>
			</Grid>

			<Grid>
				<AddTaskBtn StartIcon={PlusIcon}>Добавить задачу</AddTaskBtn>
			</Grid>
		</Grid>
	)
}
