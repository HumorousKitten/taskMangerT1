
export interface ITask {
	task_id: number
	title: string 
	description: string | null
	status: 'ToDo' | 'InProgress' | 'Done' | ''
	priority: 'Low' | 'Medium' | 'High' | ''
	category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test' | ''
	createdAt: string
}