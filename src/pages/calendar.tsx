import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useTodoStore } from '../TodoContext';

declare global {
  interface Window {
    FullCalendar: any;
  }
}

export default function CalendarPage() {
  const { todos, updateTodo, removeTodo } = useTodoStore();
  const calendarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (calendarRef.current && window.FullCalendar) {
      const calendar = new window.FullCalendar.Calendar(calendarRef.current, {
        initialView: 'dayGridMonth',
        editable: true,
        events: todos.map((todo) => ({
          id: String(todo.id),
          title: todo.title,
          start: todo.createdAt,
        })),
        eventClick: (info: any) => {
          const newTitle = window.prompt(
            'Nuevo título (deje vacío para eliminar)',
            info.event.title,
          );
          if (newTitle === null) {
            return;
          }
          if (!newTitle.trim()) {
            if (window.confirm('¿Eliminar este evento?')) {
              removeTodo(Number(info.event.id));
            }
          } else {
            updateTodo(Number(info.event.id), { title: newTitle.trim() });
          }
        },
        eventDrop: (info: any) => {
          if (info.event.start) {
            updateTodo(Number(info.event.id), { createdAt: info.event.start });
          }
        },
      });
      calendar.render();
      return () => calendar.destroy();
    }
  }, [todos]);

  return (
    <PageContainer>
      <div ref={calendarRef} />
    </PageContainer>
  );
}

