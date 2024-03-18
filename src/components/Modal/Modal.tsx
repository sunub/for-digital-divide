'use client';

import React from 'react';
import ReactFocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import * as Styled from './Modal.styled';

function Modal({
  handleDismiss,
  children,
}: {
  handleDismiss?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleDismiss && handleDismiss(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDismiss]);

  return (
    <ReactFocusLock>
      <RemoveScroll>
        <Styled.Wrapper>
          <Styled.Backdrop
            onClick={() => handleDismiss && handleDismiss(false)}
          />
          <Styled.Modal ref={modalRef}>
            <Styled.CloseButton
              onClick={() => handleDismiss && handleDismiss(false)}
            >
              <span className="material-icons">close</span>
            </Styled.CloseButton>
            {children}
          </Styled.Modal>
        </Styled.Wrapper>
      </RemoveScroll>
    </ReactFocusLock>
  );
}

export default Modal;
