import Container from '@mui/material/Container'
import { TasksFilter } from '../../features/taskFilter/TaskFilter'
import { TaskList } from '../../widgets/taskList/TaskList'
import React from 'react'
import { ITask } from '../../shared/types/types'

export const TaskPage = () => {
	const [filters, setFilters] = React.useState<Pick<ITask, 'status' | 'category' | 'priority'>>({
		category: '',
		priority: '',
		status: '',
	})

	const handleFilterChange = (field: keyof typeof filters, value: string) => {
		setFilters(prev => ({ ...prev, [field]: value }))
	}

	return (
		<main>
			<Container maxWidth='xl' sx={{ border: '1px solid red' }}>
				<TasksFilter filters={filters} onChange={handleFilterChange}/>
				<TaskList filters={filters}/>
			</Container>
		</main>
	)
}
