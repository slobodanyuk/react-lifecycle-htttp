import './App.css'
import { NavLink, Outlet } from 'react-router'

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <nav className="sidebar-nav" aria-label="Основная навигация">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' sidebar-link-active' : ''}`
            }
          >
            Часы
          </NavLink>
          <NavLink
            to="/crud"
            className={({ isActive }) =>
              `sidebar-link${isActive ? ' sidebar-link-active' : ''}`
            }
          >
            Заметки
          </NavLink>
        </nav>
      </aside>

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
