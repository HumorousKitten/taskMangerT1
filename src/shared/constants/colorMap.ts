export const colorMap = {
  status: {
    'ToDo': 'secondary',
    'InProgress': 'info',
    Done: 'success',
  },
  priority: {
    Low: 'secondary',
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