import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types/todo';

@Pipe({
  name: 'filterActive',
  standalone: true,
})
export class FilterActivePipe implements PipeTransform {

  transform(todos: Todo[]): Todo[] {
    console.log('calc');

    return todos.filter(todo => !todo.completed);
  }
}
