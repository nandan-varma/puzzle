import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  style?: Record<string, string | number>;
}

export function Container({ children, style }: ContainerProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  style?: Record<string, string | number>;
}

export function Card({ children, style }: CardProps) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '1.5rem',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  style?: Record<string, string | number>;
}

export function Button({
  children,
  type = 'button',
  onClick,
  disabled,
  variant = 'primary',
  size = 'md',
  style,
}: ButtonProps) {
  const sizes = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
  };

  const baseStyle: Record<string, string | number> = {
    minHeight: '44px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s',
    border: 'none',
    width: '100%',
    ...sizes[size],
    ...style,
  };

  const variants = {
    primary: { backgroundColor: '#3b82f6', color: '#fff' },
    secondary: { backgroundColor: '#6b7280', color: '#fff' },
    outline: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '1px solid #3b82f6',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
    >
      {children}
    </button>
  );
}

interface InputProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  disabled,
  placeholder,
  error,
}: InputProps) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '500',
          color: '#374151',
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
          fontSize: '16px',
          outline: 'none',
          backgroundColor: disabled ? '#f9fafb' : '#fff',
        }}
      />
      {error && (
        <p
          style={{
            color: '#ef4444',
            fontSize: '0.875rem',
            marginTop: '0.25rem',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface LinkButtonProps {
  children: ReactNode;
  href: string;
  style?: Record<string, string | number>;
}

export function LinkButton({ children, href, style }: LinkButtonProps) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        backgroundColor: '#3b82f6',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: '500',
        minHeight: '44px',
        ...style,
      }}
    >
      {children}
    </a>
  );
}

interface GameCardProps {
  href: string;
  name: string;
  desc: string;
  color: string;
}

export function GameCard({ href, name, desc, color }: GameCardProps) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        textDecoration: 'none',
        color: '#1f2937',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: color,
          marginBottom: '0.75rem',
        }}
      />
      <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>{name}</div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{desc}</div>
    </a>
  );
}
