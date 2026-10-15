import API_BASE_URL from '../api';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTask() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${API_BASE_URL}/api/tasks/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Task not found.');
          }
          throw new Error(`Request failed: ${response.status}`);
        }

        setTask(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load task.');
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

  return (
    <div className="task-detail-page">
      <div className="task-detail-heading">
        <div>
          <p className="tasks-eyebrow">YOUR WORKSPACE</p>
          <h1>Task Details</h1>
          <p className="task-detail-subtitle">
            Review your task information and current status.
          </p>
        </div>

        <Link to="/tasks" className="task-detail-back-button">
          ← Back to Tasks
        </Link>
      </div>

      {loading && (
        <div className="task-detail-message">
          Loading task details...
        </div>
      )}

      {!loading && error && (
        <section className="task-detail-card">
          <div className="task-detail-error" role="alert">
            {error}
          </div>
          <Link to="/tasks" className="task-detail-primary-button">
            Return to All Tasks
          </Link>
        </section>
      )}

      {!loading && !error && task && (
        <section className="task-detail-card">
          <div className="task-detail-card-top">
            <div className="task-detail-icon" aria-hidden="true">
              ▤
            </div>

            <span
              className={`tasks-status-badge ${
                task.completed
                  ? 'tasks-status-completed'
                  : 'tasks-status-pending'
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>

          <p className="task-detail-label">TASK TITLE</p>
          <h2 className="task-detail-title">
            {task.title || 'Untitled task'}
          </h2>

          <div className="task-detail-divider" />

          <div className="task-detail-information">
            <h3>Description</h3>
            <p className="task-detail-description">
              {task.description || 'No description added for this task.'}
            </p>
          </div>

          <div className="task-detail-id-box">
            <span>Task ID</span>
            <strong>#{task.id}</strong>
          </div>

          <div className="task-detail-actions">
            <Link
              to={`/tasks/${task.id}/edit`}
              className="task-detail-primary-button"
            >
              Edit Task
            </Link>

            <Link
              to="/tasks"
              className="task-detail-secondary-button"
            >
              Back to All Tasks
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default TaskDetail;
