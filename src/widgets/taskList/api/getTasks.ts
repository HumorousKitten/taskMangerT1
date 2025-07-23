import { api } from '@/shared/api/axiosInstance';
import { ITask } from '@/shared/types/types';


export async function getTasks(page: number = 1, limit: number = 10): Promise<ITask[]> {
  try {
    const response = await api.get<ITask[]>(`/tasks?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err) {
    console.error('Ошибка при загрузке задач: ', err);
    throw err;
  }
}
