const STATUS = { todo: '#6b7280', in_progress: '#3b82f6', done: '#10b981' };
const PRIORITY = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <div className="task-badges">
        <span className="badge" style={{ color: STATUS[task.status], background: STATUS[task.status] + '22' }}>
          {task.status.replace('_', ' ')}
        </span>
        <span className="badge" style={{ color: PRIORITY[task.priority], background: PRIORITY[task.priority] + '22' }}>
          {task.priority}
        </span>
      </div>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && <small>Hạn: {task.dueDate}</small>}
      <div className="task-actions">
        <button className="btn-sm" onClick={onEdit}>Sửa</button>
        <button className="btn-sm btn-danger" onClick={() => onDelete(task.id)}>Xoá</button>
      </div>
    </div>
  );
}
