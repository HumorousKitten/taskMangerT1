import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { ITask } from '../shared/types/types';
import { persist } from 'zustand/middleware'

interface Filters {
  category: ITask['category'] | '';
  priority: ITask['priority'] | '';
  status: ITask['status'] | '';
}

interface IUseTaskStore {
	tasks: ITask[]
	addTask: (title: string) => void
	getTaskById: (id: number) => ITask | undefined
	updateTask: (task: ITask) => void
	deleteTask: (id: number) => void
	filterTasks: (filters: Filters) => ITask[]
}

export const useTaskStore = create<IUseTaskStore>()(

	persist(

		immer((set, get) => ({
			tasks: [],

			addTask: title => set(state => {
				const newId = !state.tasks.length ? 1 : state.tasks[state.tasks.length - 1].id + 1
				state.tasks.push({id: newId, title, status: 'To Do', category: '', priority: '', description: ''})
			}),

			getTaskById: id => get().tasks.find((item) => item.id === id),

			updateTask: task => set(state => {
				const oldTask = state.tasks.find((item) => item.id === task.id)
				if(!oldTask) return
				Object.assign(oldTask, task);
			}),

			deleteTask: id => set(state => {
				state.tasks = state.tasks.filter(item => item.id !== id)
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