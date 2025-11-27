import { ReactNode } from 'react';

type BottomNavItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

type BottomNavProps = {
  items: BottomNavItem[];
  onCentralAction?: () => void;
  centralLabel?: string;
};

const BottomNav = ({ items, onCentralAction, centralLabel = 'Action' }: BottomNavProps) => (
  <nav className="bottom-nav">
    {items.map((item) => (
      <button
        key={item.key}
        type="button"
        className={item.active ? 'bottom-nav-item is-active' : 'bottom-nav-item'}
        onClick={item.onClick}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    ))}
    <button type="button" className="bottom-nav-central" onClick={onCentralAction}>
      <span className="bottom-nav-central-label">{centralLabel}</span>
    </button>
  </nav>
);

export default BottomNav;
