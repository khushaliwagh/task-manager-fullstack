
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
