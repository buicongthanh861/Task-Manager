import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskCard from '../components/TaskCard';

const task = { id: '1', title: 'Test Task', description: 'Mô tả', status: 'todo', priority: 'medium', dueDate: '2025-12-31' };

describe('TaskCard', () => {
  it('renders title', () => {
    render(<TaskCard task={task} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders status badge', () => {
    render(<TaskCard task={task} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('todo')).toBeInTheDocument();
  });
});
