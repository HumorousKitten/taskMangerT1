import { api } from '@/shared/api/axiosInstance';
import { ITask } from '@/shared/types/types';


export async function getTaskById(id: number): Promise<ITask> {
	try {
		const response = await api.get<ITask>(`/tasks/${id}`);
		return response.data;
	} catch (err) {
		console.error('Ошибка при получении задачи: ', err);
		throw err;
	}
}
