import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useTodoStore } from '../TodoContext';

declare global {
  interface Window {
    FullCalendar: any;
  }
}

export default function CalendarPage() {
  const { todos } = useTodoStore();
  const calendarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (calendarRef.current && window.FullCalendar) {
      const calendar = new window.FullCalendar.Calendar(calendarRef.current, {
        initialView: 'dayGridMonth',
        events: todos.map((todo) => ({
          id: String(todo.id),
          title: todo.title,
          start: todo.createdAt,
        })),
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

