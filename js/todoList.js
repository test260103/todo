class TodoList {
  constructor() {
    this.todos = [];
  }

  add(text) {
    const todo = new Todo(text);
    this.todos.push(todo);
    return todo;
  }

  remove(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }

  find(id) {
    return this.todos.find(todo => todo.id === id);
  }

  toggle(id) {
    const todo = this.find(id);
    if (todo) {
      todo.toggle();
      return true;
    }
    return false;
  }

  update(id, newText) {
    const todo = this.find(id);
    if (todo) {
      todo.updateText(newText);
      return true;
    }
    return false;
  }

  updateProgress(id, progress) {
    const todo = this.find(id);
    if (todo) {
      todo.updateProgress(progress);
      return true;
    }
    return false;
  }

  getAll() {
    return this.todos;
  }

  getFiltered(filter) {
    switch(filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  getStats() {
    return {
      total: this.todos.length,
      active: this.todos.filter(todo => !todo.completed).length,
      completed: this.todos.filter(todo => todo.completed).length
    };
  }
}
