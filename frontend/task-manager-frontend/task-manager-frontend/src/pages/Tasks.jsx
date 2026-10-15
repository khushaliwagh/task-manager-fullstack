import API_BASE_URL from '../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchTasks() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/tasks`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                const data = await response.json();
                setTasks(data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Could not load tasks.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchTasks();

        return () => controller.abort();
    }, []);

    const filteredTasks = tasks.filter((task) =>
        (task.title || '').toLowerCase().includes(search.toLowerCase())
    );

    // Delete only after the user confirms.
    async function handleDelete(taskId) {
        const confirmed = window.confirm(
            'Are you sure you want to delete this task?'
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/tasks/${taskId}`,
                { method: 'DELETE' }
            );

            if (!response.ok) {
                throw new Error(`Delete failed: ${response.status}`);
            }

            setTasks((currentTasks) =>
                currentTasks.filter((task) => task.id !== taskId)
            );

            window.alert('Task deleted successfully!');
        } catch (err) {
            window.alert(err.message || 'Could not delete the task.');
        }
    }

    const completedCount = tasks.filter((task) => task.completed).length;
    const pendingCount = tasks.length - completedCount;

    return (
        <div className="tasks-page">
            <div className="tasks-page-heading">
                <div>
                    <p className="tasks-eyebrow">YOUR WORKSPACE</p>
                    <h1>All Tasks</h1>
                    <p className="tasks-page-subtitle">
                        Keep track of your work, one task at a time.
                    </p>
                </div>

                <Link to="/tasks/add" className="tasks-add-button">
                    <span aria-hidden="true">＋</span> Create New Task
                </Link>
            </div>

            <div className="tasks-summary-grid">
                <div className="tasks-summary-card">
                    <span className="tasks-summary-icon tasks-icon-purple">
                        ▤
                    </span>
                    <div>
                        <p>Total Tasks</p>
                        <h2>{tasks.length}</h2>
                    </div>
                </div>

                <div className="tasks-summary-card">
                    <span className="tasks-summary-icon tasks-icon-orange">
                        ◷
                    </span>
                    <div>
                        <p>Pending</p>
                        <h2>{pendingCount}</h2>
                    </div>
                </div>

                <div className="tasks-summary-card">
                    <span className="tasks-summary-icon tasks-icon-green">
                        ✓
                    </span>
                    <div>
                        <p>Completed</p>
                        <h2>{completedCount}</h2>
                    </div>
                </div>
            </div>

            <section className="tasks-list-panel">
                <div className="tasks-list-heading">
                    <div>
                        <h2>My Tasks</h2>
                        <p>View and manage your tasks below.</p>
                    </div>

                    <span className="tasks-count-label">
                        {filteredTasks.length}{' '}
                        {filteredTasks.length === 1 ? 'task' : 'tasks'}
                    </span>
                </div>

                <div className="tasks-search-wrapper">
                    <span aria-hidden="true" className="tasks-search-icon">
                        ⌕
                    </span>

                    <input
                        className="tasks-search-input"
                        type="text"
                        placeholder="Search tasks by title..."
                        aria-label="Search tasks by title"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    {search && (
                        <button
                            type="button"
                            className="tasks-clear-search"
                            onClick={() => setSearch('')}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                {loading && (
                    <div className="tasks-message">
                        <span className="tasks-loading-dot" />
                        Loading your tasks...
                    </div>
                )}

                {!loading && error && (
                    <div className="tasks-message tasks-error-message">
                        <h3>Unable to load tasks</h3>
                        <p>{error}</p>
                        <p>
                            Check that your Spring Boot backend is running on
                            port 8081, then refresh this page.
                        </p>
                    </div>
                )}

                {!loading && !error && filteredTasks.length === 0 && (
                    <div className="tasks-empty-state">
                        <div className="tasks-empty-icon" aria-hidden="true">
                            ✓
                        </div>

                        <h3>
                            {search ? 'No matching tasks' : 'No tasks yet'}
                        </h3>

                        <p>
                            {search
                                ? 'Try another title or clear your search.'
                                : 'Create your first task to get started.'}
                        </p>

                        {search ? (
                            <button
                                type="button"
                                className="tasks-secondary-button"
                                onClick={() => setSearch('')}
                            >
                                Clear Search
                            </button>
                        ) : (
                            <Link
                                to="/tasks/add"
                                className="tasks-add-button"
                            >
                                Create Your First Task
                            </Link>
                        )}
                    </div>
                )}

                {!loading && !error && filteredTasks.length > 0 && (
                    <div className="tasks-card-list">
                        {filteredTasks.map((task) => (
                            <article className="tasks-item-card" key={task.id}>
                                <div
                                    className={`tasks-item-marker ${
                                        task.completed
                                            ? 'tasks-marker-completed'
                                            : 'tasks-marker-pending'
                                    }`}
                                    aria-hidden="true"
                                >
                                    {task.completed ? '✓' : '○'}
                                </div>

                                <div className="tasks-item-content">
                                    <div className="tasks-item-title-row">
                                        <h3>{task.title || 'Untitled task'}</h3>

                                        <span
                                            className={`tasks-status-badge ${
                                                task.completed
                                                    ? 'tasks-status-completed'
                                                    : 'tasks-status-pending'
                                            }`}
                                        >
                                            {task.completed
                                                ? 'Completed'
                                                : 'Pending'}
                                        </span>
                                    </div>

                                    <p className="tasks-item-description">
                                        {task.description ||
                                            'No description added.'}
                                    </p>

                                    <p className="tasks-item-id">
                                        Task #{task.id}
                                    </p>
                                </div>

                                <div className="tasks-item-actions">
                                    <Link
                                        to={`/tasks/${task.id}`}
                                        className="tasks-action-link"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/tasks/${task.id}/edit`}
                                        className="tasks-action-link"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        className="tasks-delete-button"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Tasks;