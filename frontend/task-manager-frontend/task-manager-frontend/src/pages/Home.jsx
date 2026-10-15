
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTasks() {
      try {
        const response = await fetch(
          'http://localhost:8081/api/tasks',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to load task statistics.');
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

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const progress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="home-dashboard">
      <section className="home-welcome">
        <div>
          <p className="tm-eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>Make today count<span>.</span></h1>
          <p className="home-subtitle">
            Organize your work, focus on what matters, and make progress
            one task at a time.
          </p>

          <div className="home-actions">
            <Link className="tm-button tm-button-primary" to="/tasks/add">
              <span>＋</span> Create New Task
            </Link>

            <Link className="tm-button tm-button-secondary" to="/tasks">
              View All Tasks
            </Link>
          </div>
        </div>

        <div className="home-illustration" aria-hidden="true">
          <div className="home-illustration-circle">
            <div className="home-illustration-card">
              <div className="home-illustration-check">✓</div>
              <div className="home-illustration-line long" />
              <div className="home-illustration-line" />
              <div className="home-illustration-line short" />
            </div>
            <span className="home-sparkle sparkle-one">✦</span>
            <span className="home-sparkle sparkle-two">✧</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <h2>Your overview</h2>
            <p>A quick look at your current workload.</p>
          </div>
          <Link to="/tasks" className="home-text-link">
            View task list →
          </Link>
        </div>

        {error && <p className="home-error">{error}</p>}

        <div className="home-stats-grid">
          <article className="home-stat-card">
            <div className="home-stat-top">
              <span className="home-stat-icon purple">▤</span>
              <span className="home-stat-label">ALL TASKS</span>
            </div>
            <strong className="home-stat-number">
              {loading ? '—' : tasks.length}
            </strong>
            <p>Total tasks in your workspace</p>
          </article>

          <article className="home-stat-card">
            <div className="home-stat-top">
              <span className="home-stat-icon orange">◷</span>
              <span className="home-stat-label">PENDING</span>
            </div>
            <strong className="home-stat-number">
              {loading ? '—' : pendingTasks}
            </strong>
            <p>Tasks waiting for completion</p>
          </article>

          <article className="home-stat-card">
            <div className="home-stat-top">
              <span className="home-stat-icon green">✓</span>
              <span className="home-stat-label">COMPLETED</span>
            </div>
            <strong className="home-stat-number">
              {loading ? '—' : completedTasks}
            </strong>
            <p>Tasks marked as completed</p>
          </article>
        </div>
      </section>

      <section className="home-bottom-grid">
        <article className="home-panel home-progress-panel">
          <div className="home-panel-heading">
            <div>
              <h2>Completion progress</h2>
              <p>Every small step moves you forward.</p>
            </div>
            <span className="home-progress-badge">
              {loading ? '...' : `${progress}%`}
            </span>
          </div>

          <div className="home-progress-track">
            <div
              className="home-progress-fill"
              style={{ width: `${loading ? 0 : progress}%` }}
            />
          </div>

          <p className="home-progress-caption">
            {loading
              ? 'Loading your progress...'
              : `${completedTasks} of ${tasks.length} tasks completed`}
          </p>
        </article>

        <article className="home-panel home-counter-panel">
          <div>
            <h2>Quick counter</h2>
            <p>A small interactive feature from your original app.</p>
          </div>

          <div className="home-counter-value">{count}</div>

          <button
            className="tm-button tm-button-primary home-counter-button"
            onClick={() => setCount((currentCount) => currentCount + 1)}
          >
            + Increase Counter
          </button>
        </article>
      </section>

      <section className="home-tip">
        <span className="home-tip-icon">✦</span>
        <div>
          <strong>One step at a time</strong>
          <p>Start with one task, and build momentum from there.</p>
        </div>
        <Link to="/tasks" className="home-text-link">
          Get started →
        </Link>
      </section>
    </div>
  );
}

export default Home;
