'use client';

import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { AlertDialogContext } from './AlertDialog';
import { useEffect, useRef, useContext, useState } from 'react';

export function AlertDialogContent({ children }: { children: React.ReactNode }) {
  const { open, contentId } = useContext(AlertDialogContext);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = document.getElementById('device-wrapper');
    if (rootElement) {
      setPortalRoot(rootElement);
    } else {
      console.warn('AlertDialog portal root element (#device-wrapper) not found');
    }
  }, []);

  useEffect(() => {
    if (!open || !portalRoot || !contentWrapperRef.current) return;

    const createFocusGuard = (position: string) => {
      const guard = document.createElement('span');
      guard.setAttribute('data-focus-guard', position);
      guard.setAttribute('data-aria-hidden', 'true');
      guard.setAttribute('aria-hidden', 'true');
      guard.style.cssText = 'outline: none; opacity: 0; position: fixed; pointer-events: none;';
      return guard;
    };

    const firstFocusGuard = createFocusGuard('device-first-focus-guard');
    const lastFocusGuard = createFocusGuard('device-last-focus-guard');

    console.log('Adding focus guards to portal root:', portalRoot);
    portalRoot.insertAdjacentElement('afterbegin', firstFocusGuard);
    portalRoot.insertAdjacentElement('beforeend', lastFocusGuard);

    const focusableElementsQuery =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

    const contentWrapper = contentWrapperRef.current;
    const getFocusableElements = () => Array.from(contentWrapper.querySelectorAll(focusableElementsQuery));

    const handleFirstGuardFocus = () => {
      const focusable = getFocusableElements();
      if (focusable.length > 1) {
        (focusable[focusable.length - 2] as HTMLElement).focus();
      }
    };

    const handleLastGuardFocus = () => {
      const focusable = getFocusableElements();
      if (focusable.length > 1) {
        (focusable[1] as HTMLElement).focus();
      }
    };

    firstFocusGuard.addEventListener('focus', handleFirstGuardFocus);
    lastFocusGuard.addEventListener('focus', handleLastGuardFocus);

    const contentFocusable = Array.from(
      document.getElementById(contentId)?.querySelectorAll(focusableElementsQuery) || [],
    );
    if (contentFocusable.length > 0) {
      (contentFocusable[0] as HTMLElement).focus();
    }

    return () => {
      firstFocusGuard.removeEventListener('focus', handleFirstGuardFocus);
      lastFocusGuard.removeEventListener('focus', handleLastGuardFocus);
      firstFocusGuard.remove();
      lastFocusGuard.remove();
    };
  }, [open, contentId]);

  if (!open || !portalRoot) {
    return null;
  }

  return createPortal(
    <>
      <Backdrop data-state={open ? 'open' : 'closed'} />
      <ContentWrapper
        ref={contentWrapperRef}
        role="alertdialog"
        id={contentId}
        aria-modal="true"
        data-state={open ? 'open' : 'closed'}
        tabIndex={-1}
      >
        {children}
      </ContentWrapper>
    </>,
    portalRoot,
  );
}

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 2.45rem;
  background-color: oklch(0.2158 0.0666 288.17775174927874 / 50%);
  backdrop-filter: blur(10px);
  z-index: 40;

  &[data-state='open'] {
    animation: fadeIn 0.2s ease-out;
  }
  &[data-state='closed'] {
    animation: fadeOut 0.2s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const ContentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: color-mix(in oklch, var(--color-transparent) 0%, var(--color-background));
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 50;
  min-width: 300px;
  max-width: 100cqw;

  &:focus {
    outline: none;
  }

  &[data-state='open'] {
    animation: contentShow 0.2s ease-out;
  }
  &[data-state='closed'] {
    animation: contentHide 0.2s ease-in;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes contentHide {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
  }
`;
