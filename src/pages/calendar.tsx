import * as React from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import type { EventClickArg, EventDropArg } from '@fullcalendar/core';
import '@fullcalendar/core/index.css';
import '@fullcalendar/daygrid/index.css';
import '@fullcalendar/timegrid/index.css';
import '@fullcalendar/list/index.css';
import { useTodoStore } from '../TodoContext';

export default function CalendarPage() {
  const { todos, updateTodo, removeTodo } = useTodoStore();

  return (
    <PageContainer>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        editable
        headerToolbar={{
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          end: 'prev,next today',
        }}
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
        }}
        events={todos.map((todo) => ({
          id: String(todo.id),
          title: todo.title,
          start: todo.createdAt,
        }))}
        eventClick={(info: EventClickArg) => {
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
        }}
        eventDrop={(info: EventDropArg) => {
          if (info.event.start) {
            updateTodo(Number(info.event.id), { createdAt: info.event.start });
          }
        }}
      />
    </PageContainer>
  );
}

