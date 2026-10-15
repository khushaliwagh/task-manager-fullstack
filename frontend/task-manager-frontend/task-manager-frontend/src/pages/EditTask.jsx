
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTask() {
      try {
        const response = await fetch(
          `http://localhost:8081/api/tasks/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Task not found. Please check the task ID.');
        }

        const task = await response.json();

        setTitle(task.title ?? '');
        setDescription(task.description ?? '');
        setCompleted(task.completed ?? false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load task.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTask();

    return () => controller.abort();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(
        `http://localhost:8081/api/tasks/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Task not found. It may have been removed.'
            : 'Unable to update task. Please try again.'
        );
      }

      navigate(`/tasks/${id}`);
    } catch (err) {
      setError(err.message || 'Unable to connect to the backend.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="edit-task-page">
        <div className="edit-task-message">Loading task...</div>
      </div>
    );
  }

  if (error && !title && !description) {
    return (
      <div className="edit-task-page">
        <div className="edit-task-card">
          <div className="edit-task-error" role="alert">{error}</div>
          <Link to="/tasks" className="edit-task-back-link">
            ← Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-task-page">
      <div className="edit-task-heading">
        <div>
          <p className="tasks-eyebrow">YOUR WORKSPACE</p>
          <h1>Edit Task</h1>
          <p className="edit-task-subtitle">
            Update your task details and keep everything organized.
          </p>
        </div>

        <Link to="/tasks" className="edit-task-back-link">
          ← Back to Tasks
        </Link>
      </div>

      <section className="edit-task-card">
        <div className="edit-task-card-heading">
          <div className="edit-task-heading-icon" aria-hidden="true">
            ✎
          </div>
          <div>
            <h2>Task Details</h2>
            <p>Make changes to your existing task below.</p>
            <span className="edit-task-id">Task ID: {id}</span>
          </div>
        </div>

        {error && (
          <div className="edit-task-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-task-form">
          <div className="edit-task-field">
            <label htmlFor="edit-title">Task Title <span>*</span></label>
            <input
              id="edit-title"
              className="edit-task-input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="edit-task-field">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              className="edit-task-textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              placeholder="Add details about this task"
            />
          </div>

          <label className="edit-task-completed-option">
            <input
              type="checkbox"
              checked={completed}
              onChange={(event) => setCompleted(event.target.checked)}
            />
            <span className="edit-task-checkbox-copy">
              <strong>Mark as completed</strong>
              <small>
                {completed
                  ? 'This task is marked as completed.'
                  : 'This task is still pending.'}
              </small>
            </span>
          </label>

          <div className="edit-task-form-actions">
            <Link
              to={`/tasks/${id}`}
              className="edit-task-cancel-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="edit-task-save-button"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditTask;
