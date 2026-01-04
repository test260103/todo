class Todo {
  constructor(text, id = Date.now().toString()) {
    this.id = id;
    this.text = text;
    this.completed = false;
    this.progress = 0;
    this.createdAt = new Date().toISOString();
  }

  toggle() {
    this.completed = !this.completed;
    if (this.completed) {
      this.progress = 100;
    } else if (this.progress === 100) {
      this.progress = 0;
    }
  }

  updateText(newText) {
    this.text = newText;
  }

  updateProgress(progress) {
    this.progress = Math.max(0, Math.min(100, progress));
    if (this.progress === 100) {
      this.completed = true;
    } else if (this.completed && this.progress < 100) {
      this.completed = false;
    }
  }

  toJSON() {
    return {
      id: this.id,
      text: this.text,
      completed: this.completed,
      progress: this.progress,
      createdAt: this.createdAt
    };
  }

  static fromJSON(data) {
    const todo = new Todo(data.text, data.id);
    todo.completed = data.completed;
    todo.progress = data.progress || 0;
    todo.createdAt = data.createdAt;
    return todo;
  }
}
