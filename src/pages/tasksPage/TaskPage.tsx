import React from 'react'

import Container from '@mui/material/Container'

import { ITask } from '@shared/types/types'

import { TasksFilter } from '@/features/taskFilter/TaskFilter'

import { TaskList } from '@/widgets/taskList/TaskList'


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
			<Container maxWidth='xl'>
				<TasksFilter filters={filters} onChange={handleFilterChange}/>
				<TaskList filters={filters}/>
			</Container>
		</main>
	)
}
