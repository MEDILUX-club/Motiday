import { ReactNode, useEffect } from 'react';

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
};

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        {title && <header className="modal-header">{title}</header>}
        <div className="modal-body">{children}</div>
        {onClose && (
          <footer className="modal-footer">
            <button type="button" onClick={onClose}>
              Close
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;
