export interface ITask {
	id: number
	title: string
	description: string
	status: 'To Do' | 'In Progress' | 'Done' | ''
	priority: 'Low' | 'Medium' | 'High' | ''
	category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test' | ''
}