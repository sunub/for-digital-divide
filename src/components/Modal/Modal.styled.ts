import styled from "styled-components";

const Backdrop = styled.button`
  position: absolute;
  inset: 0;
  background: oklch(2.61% 0.002 277 / 75%);
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
  padding: 16px;
`;

const Modal = styled.div`
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 32px;
  animation: showModal 0.3s cubic-bezier(0.23, 0.39, 0, 0.99) forwards;

  @keyframes showModal {
    from {
      opacity: 0;
      transform: scale(10%);
    }
    to {
      opacity: 1;
      transform: scale(100%);
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
  color: white;
  transform: translateY(-100%);
  cursor: pointer;
  background: transparent;
  border: none;
`;

export { Backdrop, Wrapper, CloseButton, Modal };
