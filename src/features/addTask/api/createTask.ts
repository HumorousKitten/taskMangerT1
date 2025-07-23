import { api } from '@/shared/api/axiosInstance';
import { ITask } from '@/shared/types/types';


export async function createTaskQuery(task: {title: string, status: 'ToDo'}): Promise<ITask> {
	try {
		const response = await api.post<ITask>(`/tasks`, {
			body: task
		});
		return response.data;
	} catch (err) {
		console.error('Ошибка при удалении задачи: ', err);
		throw err;
	}
}
