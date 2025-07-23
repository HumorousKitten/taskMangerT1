import React, { FC } from 'react';

import { Grid } from '@mui/material';

import { ITask } from '@/shared/types/types';

import { AddTask } from '@/features/addTask/AddTask';
import { TaskItem } from '@/features/taskItem/TaskItem';

import { useTaskStore } from '@/store/useTasksStore';

import { getTasks } from './api/getTasks';

interface ITaskListProps {
  filters: Pick<ITask, 'status' | 'category' | 'priority'>;
}

export const TaskList: FC<ITaskListProps> = ({ filters }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const filteredTasks = React.useMemo(() => {
    return tasks.filter((task) => {
      return (
        (!filters.category || task.category === filters.category) &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.status || task.status === filters.status)
      );
    });
  }, [tasks, filters]);

  React.useEffect(() => {
    const data = async function () {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    data();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      {filteredTasks.map((item) => (
        <Grid key={item.task_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TaskItem task={item} />
        </Grid>
      ))}

      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AddTask />
      </Grid>
    </Grid>
  );
};
