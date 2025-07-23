import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

import { ITask } from '@/shared/types/types'


interface Filters {
  category: ITask['category'] | '';
  priority: ITask['priority'] | '';
  status: ITask['status'] | '';
}

interface IUseTaskStore {
	tasks: ITask[]
	setTasks: (tasks: ITask[]) => void
	addTask: (task: ITask) => void
	getTaskById: (id: number) => ITask | undefined
	updateTask: (task: ITask) => void
	deleteTask: (id: number) => void
	filterTasks: (filters: Filters) => ITask[]
}

export const useTaskStore = create<IUseTaskStore>()(

	persist(

		immer((set, get) => ({
			tasks: [],

			setTasks: (tasks) => set(state => {
				state.tasks = tasks
			}),

			addTask: task => set(state => {
				state.tasks.push(task)
			}),

			getTaskById: id => get().tasks.find((item) => item.task_id === id),

			updateTask: task => set(state => {
				const oldTask = state.tasks.find((item) => item.task_id === task.task_id)
				if(!oldTask) return
				Object.assign(oldTask, task);
			}),

			deleteTask: id => set(state => {
				state.tasks = state.tasks.filter(item => item.task_id !== id)
			}),

			filterTasks: (filters: Filters): ITask[] => {
				const allTasks = get().tasks;

				return allTasks.filter(task => {
					return (
						(filters.category === '' || task.category === filters.category) &&
						(filters.priority === '' || task.priority === filters.priority) &&
						(filters.status === '' || task.status === filters.status)
					);
				});

			},

		})), 
	
	{
		name: 'tasksData',
		partialize: (state) => ({tasks: state.tasks})
	})

)