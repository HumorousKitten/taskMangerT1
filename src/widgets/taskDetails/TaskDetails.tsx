import React, { useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';

// Типы
type Status = 'To Do' | 'In Progress' | 'Done';
type Priority = 'Low' | 'Medium' | 'High';
type Category = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
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
  status: ['To Do', 'In Progress', 'Done'],
  priority: ['Low', 'Medium', 'High'],
  category: ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'],
};

const colorMap = {
  status: {
    'To Do': 'default',
    'In Progress': 'info',
    Done: 'success',
  },
  priority: {
    Low: 'default',
    Medium: 'warning',
    High: 'error',
  },
  category: {
    Bug: 'error',
    Feature: 'success',
    Documentation: 'primary',
    Refactor: 'warning',
    Test: 'info',
  },
} as const;

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
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState('Название задачи');
  const [description, setDescription] = useState('Описание задачи...');
  const [status, setStatus] = useState<Status>('In Progress');
  const [priority, setPriority] = useState<Priority>('High');
  const [category, setCategory] = useState<Category>('Bug');

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [openChildModal, setOpenChildModal] = useState<null | FieldType>(null);

  const handleClose = () => navigate(-1);

  return (
    <>
      <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editTitle ? (
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditTitle(false)}
              fullWidth
              autoFocus
            />
          ) : (
            <Typography variant="h6" onClick={() => setEditTitle(true)} sx={{ cursor: 'pointer' }}>
              {title}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label={`Статус: ${status}`}
              color={colorMap.status[status]}
              onClick={() => setOpenChildModal('status')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label={`Приоритет: ${priority}`}
              color={colorMap.priority[priority]}
              onClick={() => setOpenChildModal('priority')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label={`Категория: ${category}`}
              color={colorMap.category[category]}
              onClick={() => setOpenChildModal('category')}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>

          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            {editDescription ? (
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setEditDescription(false)}
                fullWidth
                multiline
                minRows={3}
                autoFocus
              />
            ) : (
              <DialogContentText sx={{ flex: 1 }}>
                {description || 'Нет описания'}
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
              ? status
              : openChildModal === 'priority'
              ? priority
              : category
          }
          onSelect={(val) => {
            if (openChildModal === 'status') setStatus(val as Status);
            else if (openChildModal === 'priority') setPriority(val as Priority);
            else setCategory(val as Category);
          }}
        />
      )}
    </>
  );
};
