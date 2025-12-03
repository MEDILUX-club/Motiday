import type { ReactNode } from 'react';
import PageLayout from './PageLayout';
import Header from '../common/Header';
import Button from '../common/Button'; 
import ToggleButton from '../common/ToggleButton'; 

type SubLayoutProps = {
  children: ReactNode;
  
  header: {
    left?: ReactNode;
    title: string;
    right?: ReactNode;
  };

  footer?: {
    // 어떤 타입을 쓸지 결정
    type: 'double-button' | 'single-button' | 'toggle' | 'toggle-with-button' | 'none';
    
    /* [버튼 관련 Props] */
    text?: string;             
    onOk?: () => void;         
    onCancel?: () => void;     
    okText?: string;           
    cancelText?: string;
    disabled?: boolean;       
    
    
    toggleActive?: 'left' | 'right'; 
    // 매개변수가 있는 함수 타입으로 변경
    onToggle?: (side: 'left' | 'right') => void;
    
    /* [토글+버튼 타입용] */
    actionButtonText?: string;
    onActionButton?: () => void;
  };
};

const SubLayout = ({ children, header, footer }: SubLayoutProps) => {
  const footerConfig = footer ?? { type: 'none' as const };

  return (
    <PageLayout>
      <Header 
        title={header.title}
        left={header.left ?? null}
        right={header.right}
      />

      <div className="flex-1 overflow-y-auto p-4">
        {children}
      </div>

      {footerConfig.type !== 'none' && (
        <div className="w-full p-4 border-t border-gray-100 bg-white mt-auto flex justify-center">
          
          {/* CASE 1: 등록/취소 버튼 */}
          {footerConfig.type === 'double-button' && (
            <div className="flex w-full gap-3">
              <Button variant="secondary" fullWidth onClick={footerConfig.onCancel} disabled={footerConfig.disabled}>
                {footerConfig.cancelText || '취소'}
              </Button>
              <Button variant="primary" fullWidth onClick={footerConfig.onOk} disabled={footerConfig.disabled}>
                {footerConfig.okText || '등록'}
              </Button>
            </div>
          )}

          {/* CASE 2: 버튼 한 개 */}
          {footerConfig.type === 'single-button' && (
            <Button variant="primary" fullWidth onClick={footerConfig.onOk} disabled={footerConfig.disabled}>
              {footerConfig.text || '등록'}
            </Button>
          )}

          {/* CASE 3: 토글 버튼 (수정됨) */}
          {footerConfig.type === 'toggle' && (
            <div className="flex items-center justify-center w-full">
              {/* ToggleButton은 active와 onToggle을 받습니다. */}
              <ToggleButton 
                active={footerConfig.toggleActive ?? 'left'} 
                onToggle={footerConfig.onToggle ?? (() => {})} 
              />
            </div>
          )}

          {/* CASE 4: 토글 + 버튼 */}
          {footerConfig.type === 'toggle-with-button' && (
            <div className="flex items-center justify-between w-full gap-3">
              <ToggleButton 
                active={footerConfig.toggleActive ?? 'left'} 
                onToggle={footerConfig.onToggle ?? (() => {})} 
              />
              <Button variant="primary" onClick={footerConfig.onActionButton}>
                {footerConfig.actionButtonText || '참여하기'}
              </Button>
            </div>
          )}

        </div>
      )}
    </PageLayout>
  );
};

export default SubLayout;
