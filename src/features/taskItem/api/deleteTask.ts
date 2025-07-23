import { api } from '@/shared/api/axiosInstance';
import { ITask } from '@/shared/types/types';


export async function deleteTaskQuery(id: number): Promise<ITask> {
	try {
		const response = await api.delete<ITask>(`/tasks/${id}`);
		return response.data;
	} catch (err) {
		console.error('Ошибка при удалении задачи: ', err);
		throw err;
	}
}
