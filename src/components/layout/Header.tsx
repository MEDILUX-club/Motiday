import { ReactNode } from 'react';

type HeaderProps = {
  title?: string;
  onBack?: () => void;
  rightSlot?: ReactNode;
  sticky?: boolean;
};

const Header = ({ title, onBack, rightSlot, sticky = false }: HeaderProps) => (
  <header className={sticky ? 'header is-sticky' : 'header'}>
    <div className="header-left">
      {onBack && (
        <button type="button" className="header-back" onClick={onBack} aria-label="Go back">
          ←
        </button>
      )}
      {title && <h1 className="header-title">{title}</h1>}
    </div>
    <div className="header-right">{rightSlot}</div>
  </header>
);

export default Header;
