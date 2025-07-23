import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useImmer } from 'use-immer'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Chip,
  Typography,
  IconButton,
  TextField,
  Stack,
  Button,
  Modal,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'

import { colorMap } from '@/shared/constants/colorMap'
import { ITask } from '@/shared/types/types'

import { useTaskStore } from '@/store/useTasksStore'

import { updateTask } from './api/updateTask';
import { getTaskById } from './api/getTaskById';

type Status = ITask['status'];
type Priority = ITask['priority'];
type Category = ITask['category'];
type FieldType = 'status' | 'priority' | 'category';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
};

const options: Record<FieldType, string[]> = {
  status: ['ToDo', 'InProgress', 'Done'],
  priority: ['Low', 'Medium', 'High'],
  category: ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'],
};


type ColorMap = typeof colorMap;

const ChildModal = ({
  open,
  onClose,
  title,
  values,
  selected,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  title: FieldType;
  values: string[];
  selected: string;
  onSelect: (value: string) => void;
}) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{ ...style, width: 250 }}>
      <Typography variant="h6" mb={2}>
        Выберите {title}
      </Typography>
      <Stack spacing={1}>
        {values.map((val) => (
          <Button
            key={val}
            variant={val === selected ? 'contained' : 'outlined'}
            color={
              colorMap[title][val as keyof ColorMap[typeof title]]
            }
            onClick={() => {
              console.log(val)
              onSelect(val);
              onClose();
            }}
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Box mt={2} textAlign="right">
        <Button onClick={onClose}>Закрыть</Button>
      </Box>
    </Box>
  </Modal>
);



export const TaskDetails = () => {
  const navigate = useNavigate()
  const {id} = useParams()


  const [taskDetails, updateTaskDetails] = useImmer<Omit<ITask, 'task_id' | 'createdAt'>>({
    title: '',
    description: null,
    status: 'ToDo',
    priority: '',
    category: '',
  })

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [openChildModal, setOpenChildModal] = useState<null | FieldType>(null);

  React.useEffect(() => {
    if(!id) return
    const taskData = async () => {
      const task = await getTaskById(+id)
      if(!task) return
      updateTaskDetails((draft) => {
        draft.title = task.title
        draft.category = task.category
        draft.priority = task.priority
        draft.status = task.status
        draft.description = task.description
      })
    }
    
    taskData()
  }, [])

  const handleClose = () => navigate(-1);

  const handleEdit = async () => {
    if(!id) return

    await updateTask(+id, taskDetails)

    handleClose()
  }

  return (
    <>
      <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editTitle ? (
            <TextField
              value={taskDetails.title}
              onChange={(e) => updateTaskDetails(draft => {draft.title = e.target.value})}
              onBlur={() => setEditTitle(false)}
              fullWidth
              autoFocus
            />
          ) : (
            <Typography variant="h6" component = 'p' onClick={() => setEditTitle(true)} sx={{ cursor: 'pointer' }}>
              {taskDetails.title}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label={`Статус: ${taskDetails.status}`}
              color={colorMap.status[taskDetails.status || 'ToDo']}
              onClick={() => setOpenChildModal('status')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label={`Приоритет: ${taskDetails.priority ? taskDetails.priority : ''}`}
              color={taskDetails.priority ? colorMap.priority[taskDetails.priority] : undefined}
              onClick={() => setOpenChildModal('priority')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label={`Категория: ${taskDetails.category ? taskDetails.category : ''}`}
              color={taskDetails.category ? colorMap.category[taskDetails.category] : undefined}
              onClick={() => setOpenChildModal('category')}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>

          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            {editDescription ? (
              <TextField
                value={taskDetails.description}
                onChange={(e) => updateTaskDetails(draft => {draft.description = e.target.value})}
                onBlur={() => setEditDescription(false)}
                fullWidth
                multiline
                minRows={3}
                autoFocus
              />
            ) : (
              <DialogContentText sx={{ flex: 1 }}>
                {taskDetails.description || 'Добавьте описание'}
              </DialogContentText>
            )}
            {!editDescription && (
              <IconButton onClick={() => setEditDescription(true)}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleEdit}>Изменить</Button>
        </DialogActions>
      </Dialog>

      {openChildModal && (
        <ChildModal
          open
          onClose={() => setOpenChildModal(null)}
          title={openChildModal}
          values={options[openChildModal]}
          selected={
            openChildModal === 'status'
              ? taskDetails.status
              : openChildModal === 'priority'
              ? taskDetails.priority ? taskDetails.priority : '' 
              : taskDetails.category ? taskDetails.category : ''
          }
          onSelect={(val) => {
            if (openChildModal === 'status') updateTaskDetails(draft => {
             draft.status = val as Status
            })
            else if (openChildModal === 'priority') updateTaskDetails(draft => {
              draft.priority = val as Priority
            })
            else updateTaskDetails(draft => {draft.category = val as Category});
          }}
        />
      )}
    </>
  );
};
