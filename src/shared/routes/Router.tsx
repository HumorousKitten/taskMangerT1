import { createBrowserRouter } from 'react-router-dom'

import { TaskPage } from '../../pages/tasksPage/TaskPage'

import { TaskDetails } from '../../widgets/taskDetails/TaskDetails'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <TaskPage />,
	},

	{
		path: 'task/:id',
		element: <TaskDetails />,
	},
])
