import { TaskList } from '../../widgets/taskList/TaskList';
import Container from '@mui/material/Container';

export const TaskPage = () => {
	return (
		<main>
			<Container maxWidth='xl' sx={{border: '1px solid red'}}>
				<TaskList />
			</Container>
		</main>
	);
}
 
