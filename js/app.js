class App {
  constructor() {
    this.todoList = new TodoList();
    this.ui = new UI();
    this.currentFilter = 'all';

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.ui.todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAdd();
    });

    this.ui.todoList.addEventListener('click', (e) => {
      const todoItem = e.target.closest('.todo-item');
      if (!todoItem) return;

      const id = todoItem.dataset.id;

      if (e.target.classList.contains('todo-checkbox')) {
        this.handleToggle(id);
      } else if (e.target.classList.contains('btn-delete')) {
        this.handleDelete(id);
      } else if (e.target.classList.contains('btn-edit')) {
        this.handleEdit(id, todoItem);
      }
    });

    this.ui.todoList.addEventListener('input', (e) => {
      if (e.target.classList.contains('progress-slider')) {
        this.handleProgressChange(e.target);
      }
    });

    this.ui.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.filter;
        this.ui.setActiveFilter(this.currentFilter);
        this.render();
      });
    });

    this.ui.todoList.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.classList.contains('todo-edit-input')) {
        this.handleEditSave(e.target);
      }
    });

    this.ui.todoList.addEventListener('blur', (e) => {
      if (e.target.classList.contains('todo-edit-input')) {
        this.handleEditSave(e.target);
      }
    }, true);
  }

  handleAdd() {
    const text = this.ui.todoInput.value.trim();
    if (text === '') return;

    this.todoList.add(text);
    this.ui.clearInput();
    this.render();
  }

  handleDelete(id) {
    if (confirm('このタスクを削除しますか？')) {
      this.todoList.remove(id);
      this.render();
    }
  }

  handleToggle(id) {
    this.todoList.toggle(id);
    this.render();
  }

  handleEdit(id, todoElement) {
    const input = this.ui.toggleEditMode(todoElement, true);
    input.dataset.todoId = id;
  }

  handleEditSave(input) {
    const id = input.dataset.todoId;
    const newText = input.value.trim();

    if (newText === '') {
      this.render();
      return;
    }

    this.todoList.update(id, newText);
    this.render();
  }

  handleProgressChange(slider) {
    const todoItem = slider.closest('.todo-item');
    const id = todoItem.dataset.id;
    const progress = parseInt(slider.value, 10);

    this.todoList.updateProgress(id, progress);

    const progressValue = todoItem.querySelector('.progress-value');
    progressValue.textContent = `${progress}%`;

    const todo = this.todoList.find(id);
    if (todo.completed) {
      todoItem.classList.add('completed');
      const checkbox = todoItem.querySelector('.todo-checkbox');
      checkbox.checked = true;
    } else {
      todoItem.classList.remove('completed');
      const checkbox = todoItem.querySelector('.todo-checkbox');
      checkbox.checked = false;
    }
  }

  render() {
    const todos = this.todoList.getFiltered(this.currentFilter);
    const stats = this.todoList.getStats();

    this.ui.renderTodos(todos);
    this.ui.updateStats(stats);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
