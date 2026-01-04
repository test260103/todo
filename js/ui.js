class UI {
  constructor() {
    this.todoList = document.getElementById('todoList');
    this.todoInput = document.getElementById('todoInput');
    this.todoForm = document.getElementById('todoForm');
    this.emptyState = document.getElementById('emptyState');
    this.todoCount = document.getElementById('todoCount');
    this.filterButtons = document.querySelectorAll('.btn-filter');
  }

  createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} aria-label="タスク完了">
        <span class="todo-text">${this.escapeHtml(todo.text)}</span>
      </div>
      <div class="todo-progress">
        <label class="progress-label">進捗率: <span class="progress-value">${todo.progress}%</span></label>
        <input type="range" class="progress-slider" min="0" max="100" value="${todo.progress}" aria-label="進捗率">
      </div>
      <div class="todo-actions">
        <button class="btn btn-edit" aria-label="編集">編集</button>
        <button class="btn btn-delete" aria-label="削除">削除</button>
      </div>
    `;

    return li;
  }

  renderTodos(todos) {
    this.todoList.innerHTML = '';

    if (todos.length === 0) {
      this.showEmptyState();
    } else {
      this.hideEmptyState();
      todos.forEach(todo => {
        const element = this.createTodoElement(todo);
        this.todoList.appendChild(element);
      });
    }
  }

  updateStats(stats) {
    this.todoCount.textContent = `${stats.total}個のタスク（未完了: ${stats.active}）`;
  }

  clearInput() {
    this.todoInput.value = '';
    this.todoInput.focus();
  }

  showEmptyState() {
    this.emptyState.style.display = 'block';
  }

  hideEmptyState() {
    this.emptyState.style.display = 'none';
  }

  setActiveFilter(filter) {
    this.filterButtons.forEach(btn => {
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  toggleEditMode(todoElement, isEditing) {
    if (isEditing) {
      const textSpan = todoElement.querySelector('.todo-text');
      const currentText = textSpan.textContent;

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'todo-edit-input';
      input.value = currentText;

      textSpan.replaceWith(input);
      input.focus();
      input.select();

      return input;
    }
  }
}
