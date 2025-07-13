import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { TaskProvider } from './shared/Model/TaskProvider'
import { router } from './shared/routes/Router'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TaskProvider>
			<RouterProvider router={router} />
		</TaskProvider>
	</StrictMode>
)
