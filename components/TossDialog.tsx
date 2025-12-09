import React from 'react';

interface TossConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}

export const TossConfirmDialog: React.FC<TossConfirmDialogProps> = ({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  cancelText = '취소',
  confirmText = '확인',
}) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // 배경 클릭 시 아무 동작 안함 (wiggle 효과는 생략)
        }
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '320px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#191f28',
            marginBottom: description ? '12px' : '24px',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            lineHeight: '1.4',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: '#6b7684',
              marginBottom: '24px',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              lineHeight: '1.5',
            }}
          >
            {description}
          </p>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#4e5968',
              backgroundColor: '#f2f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#ffffff',
              backgroundColor: '#3182f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

interface TossAlertDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  buttonText?: string;
}

export const TossAlertDialog: React.FC<TossAlertDialogProps> = ({
  open,
  title,
  description,
  onClose,
  buttonText = '확인',
}) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '320px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#191f28',
            marginBottom: description ? '12px' : '24px',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            lineHeight: '1.4',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: '#6b7684',
              marginBottom: '24px',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              lineHeight: '1.5',
            }}
          >
            {description}
          </p>
        )}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#3182f6',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
