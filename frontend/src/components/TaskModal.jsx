import { useState } from 'react';
import { taskAPI } from '../services/api';

const BLANK = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' };

export default function TaskModal({ task, onClose, onSaved }) {
  const [form, setForm] = useState(task ? { title: task.title, description: task.description || '',
    status: task.status, priority: task.priority, dueDate: task.dueDate || '' } : BLANK);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError('');
    try {
      task ? await taskAPI.update(task.id, form) : await taskAPI.create(form);
      onSaved();
    } catch (err) { setError(err.response?.data?.message || 'Lỗi khi lưu'); }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{task ? 'Sửa task' : 'Tạo task mới'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={submit}>
          <input placeholder="Tiêu đề *" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} required />
          <textarea placeholder="Mô tả" value={form.description} rows={3}
            onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="row">
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
          </div>
          <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Huỷ</button>
            <button type="submit" className="btn-primary">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
