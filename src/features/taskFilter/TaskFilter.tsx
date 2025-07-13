import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const categories = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test', ''];
const priorities = ['Low', 'Medium', 'High', ''];
const statuses = ['To Do', 'In Progress', 'Done', ''];

interface FilterValues {
  category: string;
  priority: string;
  status: string;
}

interface Props {
  filters: FilterValues;
  onChange: (field: keyof FilterValues, value: string) => void;
}

export const TasksFilter: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <Box display="flex" gap={2} mb={2}>
      <FormControl fullWidth>
        <InputLabel>Категория</InputLabel>
        <Select
          value={filters.category}
          label="Категория"
          onChange={e => onChange('category', e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          {categories.filter(c => c).map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Приоритет</InputLabel>
        <Select
          value={filters.priority}
          label="Приоритет"
          onChange={e => onChange('priority', e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          {priorities.filter(p => p).map(prio => (
            <MenuItem key={prio} value={prio}>{prio}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Статус</InputLabel>
        <Select
          value={filters.status}
          label="Статус"
          onChange={e => onChange('status', e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          {statuses.filter(s => s).map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
