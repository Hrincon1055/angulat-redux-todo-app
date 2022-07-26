import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { limpiarTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  public filtroActual: actions.filtrosValidos = 'todos';
  public filtros: actions.filtrosValidos[] = [
    'todos',
    'completados',
    'pendientes',
  ];
  public pendientes: number = 0;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe((filtro: actions.filtrosValidos) => {
    //   this.filtroActual = filtro;
    // });
    this.store.subscribe((state: AppState) => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter((todo) => !todo.completado).length;
    });
  }
  public cambiarFiltro(filtro: actions.filtrosValidos): void {
    this.filtroActual = filtro;
    this.store.dispatch(actions.setFiltro({ filtro }));
  }
  public limpiarCompletados() {
    this.store.dispatch(limpiarTodo());
  }
}
