import React, { FC } from 'react';

import { Grid } from '@mui/material';

import { ITask } from '@/shared/types/types';

import { AddTask } from '@/features/addTask/AddTask';
import { TaskItem } from '@/features/taskItem/TaskItem';

import { useTaskStore } from '@/store/useTasksStore';

interface ITaskListProps {
  filters: Pick<ITask, 'status' | 'category' | 'priority'>;
}

export const TaskList: FC<ITaskListProps> = ({ filters }) => {
  const tasks = useTaskStore((state) => state.tasks);
  const filteredTasks = React.useMemo(() => {
    return tasks.filter((task) => {
      return (
        (filters.category === '' || task.category === filters.category) &&
        (filters.priority === '' || task.priority === filters.priority) &&
        (filters.status === '' || task.status === filters.status)
      );
    });
  }, [tasks, filters]);

  return (
    <Grid container spacing={2} justifyContent="center">
      {filteredTasks.map((item) => (
        <Grid key={item.id}>
          <TaskItem task={item} />
        </Grid>
      ))}

      <Grid>
        <AddTask />
      </Grid>
    </Grid>
  );
};
