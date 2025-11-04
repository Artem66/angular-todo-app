import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported if not standalone

@Component({
  selector: 'app-todo-form',
  // Ensure standalone: true if App is standalone
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss'
})
export class TodoForm {
  @Output() save = new EventEmitter<string>();

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.save.emit(this.title.value);
    this.todoForm.reset();
  }
}
