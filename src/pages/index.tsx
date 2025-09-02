import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  List,
  ListItem,
  Stack,
  Typography,
  Autocomplete,
  TextareaAutosize,
  InputBase,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type Todo = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
  createdAt: Date;
};

export default function ToDoGinNorPage() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);

  const addTodo = () => {
    if (!title.trim()) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        tags,
        completed: false,
        createdAt: new Date(),
      },
    ]);

    setTitle('');
    setDescription('');
    setTags([]);
    setShowForm(false);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const defaultTags = ['Alta', 'Media', 'Baja'];

  return (
    <PageContainer>
      <Stack spacing={2}>
        {showForm ? (
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <InputBase
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ fontSize: 20 }}
              fullWidth
            />
            <TextareaAutosize
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '1rem',
              }}
            />
            <Autocomplete
              multiple
              freeSolo
              options={defaultTags}
              value={tags}
              onChange={(_, newValue) => setTags(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <InputBase
                  {...params.inputProps}
                  placeholder="Prioridades"
                  sx={{ width: '100%' }}
                />
              )}
            />
            <Button variant="contained" onClick={addTodo} sx={{ alignSelf: 'flex-end', mt: 1 }}>
              Agregar
            </Button>
          </Box>
        ) : (
          <Box
            onClick={() => setShowForm(true)}
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              p: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <AddIcon />
          </Box>
        )}
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  {todo.title}
                </Typography>
                {todo.description && (
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                    {todo.description}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {todo.createdAt.toLocaleString()}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {todo.tags.map((tag) => (
                  <Chip key={tag} label={tag} variant="outlined" size="small" />
                ))}
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
    </PageContainer>
  );
}
