
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      const response = await fetch('http://localhost:8081/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, completed })
      });

      if (!response.ok) {
        throw new Error(`Could not save task: ${response.status}`);
      }

      navigate('/tasks');
    } catch (err) {
      setError(err.message || 'Could not save task.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="add-task-page">
      <div className="add-task-heading">
        <div>
          <p className="tasks-eyebrow">YOUR WORKSPACE</p>
          <h1>Create New Task</h1>
          <p className="add-task-subtitle">
            Add a task and keep your day organized.
          </p>
        </div>

        <Link to="/tasks" className="add-task-back-link">
          ← Back to Tasks
        </Link>
      </div>

      <section className="add-task-card">
        <div className="add-task-card-heading">
          <div className="add-task-heading-icon" aria-hidden="true">
            +
          </div>
          <div>
            <h2>Task Details</h2>
            <p>Enter the information for your new task below.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="add-task-field">
            <label htmlFor="task-title">Task Title <span>*</span></label>
            <input
              id="task-title"
              className="add-task-input"
              type="text"
              placeholder="e.g. Learn React Hooks"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <p className="add-task-field-hint">
              Give your task a short, clear title.
            </p>
          </div>

          <div className="add-task-field">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              className="add-task-textarea"
              placeholder="What do you want to accomplish?"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
            />
          </div>

          <label className="add-task-completed-option">
            <input
              type="checkbox"
              checked={completed}
              onChange={(event) => setCompleted(event.target.checked)}
            />
            <span className="add-task-checkbox-copy">
              <strong>Mark as completed</strong>
              <small>Choose this if the task is already finished.</small>
            </span>
          </label>

          {error && (
            <div className="add-task-error" role="alert">
              {error}
            </div>
          )}

          <div className="add-task-form-actions">
            <Link to="/tasks" className="add-task-cancel-button">
              Cancel
            </Link>

            <button
              type="submit"
              className="add-task-save-button"
              disabled={saving}
            >
              {saving ? 'Saving...' : '+ Save Task'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddTask;
