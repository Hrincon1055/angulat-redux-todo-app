import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;
  public checkCompletado!: FormControl;
  public txtInput!: FormControl;
  public editando: boolean = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.checkCompletado.valueChanges.subscribe((valor: boolean) => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }
  public editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }
  public terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) return;
    if (this.txtInput.value === this.todo.texto) return;
    this.store.dispatch(
      actions.editarTodo({ id: this.todo.id, texto: this.txtInput.value })
    );
  }
  public borrar() {
    this.store.dispatch(actions.borarTodo({ id: this.todo.id }));
  }
}
