import { createAction, props } from '@ngrx/store';

export const crearTodo = createAction(
  '[Todo] Crear todo',
  props<{ texto: string }>()
);
export const toggle = createAction(
  '[Todo] Toggle todo',
  props<{ id: number }>()
);
export const editarTodo = createAction(
  '[Todo] Editar todo',
  props<{ id: number; texto: string }>()
);
export const borarTodo = createAction(
  '[Todo] Borrar todo',
  props<{ id: number }>()
);
export const toggleAll = createAction(
  '[Todo] Comletar todos todo',
  props<{ completado: boolean }>()
);
export const limpiarTodo = createAction('[Todo] Limpiar todo');
