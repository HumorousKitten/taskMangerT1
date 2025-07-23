import { api } from '@/shared/api/axiosInstance';
import { ITask } from '@/shared/types/types';


type TUpdateTask = Omit<ITask, 'task_id' | 'createdAt'>

export async function updateTask(id: number, task: TUpdateTask): Promise<ITask> {
	try {
		const response = await api.patch<ITask>(`/tasks/${id}`, {
			body: task
		});
		return response.data;
	} catch (err) {
		console.error('Ошибка при изменении задачи: ', err);
		throw err;
	}
}
