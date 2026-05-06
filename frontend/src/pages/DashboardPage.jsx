import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [modal, setModal] = useState(null); // null | 'new' | task object

  const load = async () => {
    setLoading(true);
    const { data } = await taskAPI.getAll(filter);
    setTasks(data.tasks);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const handleDelete = async (id) => {
    if (!confirm('Xoá task này?')) return;
    await taskAPI.remove(id);
    setTasks(t => t.filter(x => x.id !== id));
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1>📋 Task Manager</h1>
        <div className="header-right">
          <span>Xin chào, <strong>{user?.name}</strong></span>
          <button className="btn-primary" onClick={() => setModal('new')}>+ Tạo task</button>
          <button className="btn-ghost" onClick={logout}>Đăng xuất</button>
        </div>
      </header>

      <div className="filters">
        <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
          <option value="">Tất cả trạng thái</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={filter.priority} onChange={e => setFilter({ ...filter, priority: e.target.value })}>
          <option value="">Tất cả độ ưu tiên</option>
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
        </select>
      </div>

      {loading ? <p className="center">Đang tải...</p>
        : tasks.length === 0 ? <p className="center">Chưa có task nào.</p>
        : <div className="task-grid">
            {tasks.map(t => <TaskCard key={t.id} task={t} onEdit={() => setModal(t)} onDelete={handleDelete} />)}
          </div>
      }

      {modal && (
        <TaskModal
          task={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}
