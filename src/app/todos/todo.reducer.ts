import { Action, createReducer, on } from '@ngrx/store';
import {
  crearTodo,
  toggle,
  editarTodo,
  borarTodo,
  toggleAll,
  limpiarTodo,
} from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Mi primer tarea 1'),
  new Todo('Mi primer tarea 2'),
  new Todo('Mi primer tarea 3'),
];

export const _todoReducer = createReducer(
  initialState,
  on(crearTodo, (state, { texto }) => [...state, new Todo(texto)]),
  on(limpiarTodo, (state) => state.filter((todo: Todo) => !todo.completado)),
  on(toggle, (state, { id }) => {
    return state.map((todo: Todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editarTodo, (state, { id, texto }) => {
    return state.map((todo: Todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(borarTodo, (state, { id }) =>
    state.filter((todo: Todo) => todo.id !== id)
  ),
  on(toggleAll, (state, { completado }) => {
    return state.map((todo: Todo) => {
      return {
        ...todo,
        completado: completado,
      };
    });
  })
);
export function todoReducer(state: Todo[] = initialState, action: Action) {
  return _todoReducer(state, action);
}
