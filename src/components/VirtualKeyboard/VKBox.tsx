import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: fixed;
  width: 495px;
  height: 233px;

  display: flex;
  flex-direction: column;

  padding: 10px;
  border: 1px solid oklch(14.52% 0.02 0 / 18%);
  border-radius: 10px;
  background-color: oklch(98.05% 0 294.47);
  box-shadow: 0.5px 4.5px 3.6px oklch(0% 0 0 / 2.4%),
    1.5px 12.5px 10px oklch(0% 0 0 / 3.5%),
    3.6px 30.1px 24.1px oklch(0% 0 0 / 4.6%), 12px 100px 80px oklch(0% 0 0 / 7%);
`;

function VKBox({
  keyboardRef,
  children,
}: {
  keyboardRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) {
  const bodySizeInfo = document.body.getBoundingClientRect();
  return (
    <Layout
      id="vk-box"
      ref={keyboardRef}
      style={{
        display: "none",
        userSelect: "none",
        top: `${bodySizeInfo.height - 233}px`,
        left: `${bodySizeInfo.width - 495}px`,
      }}
      tabIndex={-1}
    >
      {children}
    </Layout>
  );
}

export default VKBox;
