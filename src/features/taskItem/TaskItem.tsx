import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Chip, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { colorMap } from '@/shared/constants/colorMap';
import { ITask } from '@/shared/types/types';

import { useTaskStore } from '@/store/useTasksStore';

import { deleteTaskQuery } from './api/deleteTask';

import cl from './_taskItem.module.css';

interface ITaskItem {
  task: ITask;
}

export const TaskItem: FC<ITaskItem> = ({ task }) => {
  const data = new Date(task.createdAt);

  const formatted = data.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });


  const deleteTask = useTaskStore((state) => state.deleteTask);

  async function handleDeleteTask(e: React.MouseEvent) {
    e.preventDefault();
    const deletedTask = await deleteTaskQuery(task.task_id);
    deleteTask(deletedTask.task_id);
  }

  return (
    <Card sx={{ backgroundColor: '#000000', color: '#ffffff', width: '100%', minHeight: '150px', borderRadius: 4 }}>
      <Link to={`/task/${task.task_id}`} className={cl.link}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography component="h3">{task.title}</Typography>
            <Stack direction="row" spacing={0.5}>
              <DeleteIcon onClick={handleDeleteTask} />
              <EditNoteIcon />
            </Stack>
          </Stack>
          <Typography component="p" className={cl.description}>
            {task.description}
          </Typography>
          <Stack direction="row" spacing={1.5} mt={2}>
            <Chip label={task.status} color={colorMap.status[task.status || 'ToDo']} />
            {task.category ? (
              <Chip label={task.category} color={task.category ? colorMap.category[task.category] : undefined} />
            ) : null}
            {task.priority ? (
              <Chip label={task.priority} color={task.priority ? colorMap.priority[task.priority] : undefined} />
            ) : null}
          </Stack>
          <Typography component="p" mt={1}>
            Дата создания: {formatted}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
