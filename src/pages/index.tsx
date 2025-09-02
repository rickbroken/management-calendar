import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  Autocomplete,
  TextareaAutosize,
  InputBase,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useTodoStore } from '../TodoContext';

export default function ToDoGinNorPage() {
  const { todos, addTodo, toggleTodo, updateTodo, removeTodo } = useTodoStore();
  const [showForm, setShowForm] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');
  const [editTags, setEditTags] = React.useState<string[]>([]);
  const [editDate, setEditDate] = React.useState('');

  const handleAdd = () => {
    if (!title.trim()) {
      return;
    }

    addTodo({
      title: title.trim(),
      description: description.trim(),
      tags,
      completed: false,
      createdAt: new Date(),
    });

    setTitle('');
    setDescription('');
    setTags([]);
    setShowForm(false);
  };

  const startEdit = (todo: typeof todos[number]) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditTags(todo.tags);
    setEditDate(todo.createdAt.toISOString().slice(0, 16));
  };

  const handleSave = () => {
    if (editingId === null) return;
    updateTodo(editingId, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      tags: editTags,
      createdAt: editDate ? new Date(editDate) : new Date(),
    });
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditTags([]);
    setEditDate('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditTags([]);
    setEditDate('');
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
            <Button variant="contained" onClick={handleAdd} sx={{ alignSelf: 'flex-end', mt: 1 }}>
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
                {editingId === todo.id ? (
                  <React.Fragment>
                    <InputBase
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      sx={{ fontSize: 20 }}
                      fullWidth
                    />
                    <TextareaAutosize
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
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
                      value={editTags}
                      onChange={(_, newValue) => setEditTags(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
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
                    <InputBase
                      type="datetime-local"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
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
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {todo.tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" size="small" />
                      ))}
                    </Stack>
                  </React.Fragment>
                )}
              </Box>
              {editingId === todo.id ? (
                <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
                  <IconButton onClick={handleSave} color="primary">
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={cancelEdit} color="inherit">
                    <CloseIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
                  <IconButton onClick={() => startEdit(todo)} color="inherit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => removeTodo(todo.id)} color="inherit">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              )}
            </ListItem>
          ))}
        </List>
      </Stack>
    </PageContainer>
  );
}
