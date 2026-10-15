
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/task-manager.css';

function DashboardLayout() {
  return (
    <div className="tm-shell">
      <aside className="tm-sidebar">
        <NavLink to="/" className="tm-brand">
          <span className="tm-brand-icon">✓</span>
          <span>TaskFlow</span>
        </NavLink>

        <p className="tm-nav-label">WORKSPACE</p>

        <nav className="tm-navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `tm-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span>⌂</span> Overview
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `tm-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span>▤</span> All Tasks
          </NavLink>

          <NavLink
            to="/tasks/add"
            className={({ isActive }) =>
              `tm-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span>＋</span> Create Task
          </NavLink>
        </nav>

        <div className="tm-sidebar-bottom">
          <div className="tm-help-icon">?</div>
          <div>
            <strong>Need a hand?</strong>
            <p>Keep your work organized.</p>
          </div>
        </div>
      </aside>

      <main className="tm-main">
        <header className="tm-topbar">
          <div>
            <p className="tm-eyebrow">YOUR WORKSPACE</p>
            <h2>Task Manager</h2>
          </div>

          <div className="tm-profile">
            <div className="tm-avatar">T</div>
            <div>
              <strong>Task Manager</strong>
              <p>Personal workspace</p>
            </div>
          </div>
        </header>

        <section className="tm-content">
          <Outlet />
        </section>

        <footer className="tm-footer">
          Stay focused. Make progress.
        </footer>
      </main>
    </div>
  );
}

export default DashboardLayout;
