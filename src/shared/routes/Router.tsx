import { createBrowserRouter} from 'react-router-dom';

import { TaskPage } from '../../pages/tasksPage/TaskPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <TaskPage />,
	},

	{
		path: '/task/:id',
		element: <div>TaskID</div>
	},
])