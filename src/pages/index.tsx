import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type Todo = {
  id: number;
  text: string;
  priority: 'Alta' | 'Media' | 'Baja';
  completed: boolean;
  createdAt: Date;
};

export default function ToDoGinNorPage() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [text, setText] = React.useState('');
  const [priority, setPriority] = React.useState<'Alta' | 'Media' | 'Baja'>('Media');

  const addTodo = () => {
    if (!text.trim()) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text.trim(),
        priority,
        completed: false,
        createdAt: new Date(),
      },
    ]);

    setText('');
    setPriority('Media');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <PageContainer>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Nueva tarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="priority-label">Prioridad</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              label="Prioridad"
              onChange={(e) => setPriority(e.target.value as 'Alta' | 'Media' | 'Baja')}
            >
              <MenuItem value="Alta">Alta</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Baja">Baja</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={addTodo}>
            Agregar
          </Button>
        </Stack>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  {todo.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {todo.createdAt.toLocaleString()}
                </Typography>
              </Box>
              <Chip
                label={todo.priority}
                color={
                  todo.priority === 'Alta'
                    ? 'error'
                    : todo.priority === 'Media'
                    ? 'warning'
                    : 'default'
                }
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </PageContainer>
  );
}
