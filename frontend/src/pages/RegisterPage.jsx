import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError('');
    try { await register(form.name, form.email, form.password); nav('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Đăng ký thất bại'); }
  };

  return (
    <div className="auth-page">
      <form onSubmit={submit} className="auth-form">
        <h1>Task Manager</h1>
        <h2>Đăng ký</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" placeholder="Họ tên" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Mật khẩu (tối thiểu 6 ký tự)" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} minLength={6} required />
        <button type="submit">Đăng ký</button>
        <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
      </form>
    </div>
  );
}
