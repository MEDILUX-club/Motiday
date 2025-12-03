import { useEffect } from 'react';
import Button from './Button';

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
};

const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  showCancel = false,
}: AlertModalProps) => {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative z-10 w-[300px] bg-white rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        {/* 타이틀 */}
        {title && (
          <h3 className="text-title-lg text-gray-800 text-center mb-2">
            {title}
          </h3>
        )}

        {/* 메시지 */}
        <p className="text-body-lg text-gray-600 text-center mb-6 whitespace-pre-line">
          {message}
        </p>

        {/* 버튼 영역 */}
        <div className={`flex gap-3 ${showCancel ? 'flex-row' : 'flex-col'}`}>
          {showCancel && (
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

