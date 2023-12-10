import React from "react";
import VKBox from "./VkBox/VKBox";
import VKBoxHeader from "./VKBoxHeader";
import VKBoxBody from "./VKBoxBody";

function VirtualKeyboard({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const keyboardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!keyboardRef.current) return;

    function handleOpenKeyboard() {
      const vkBox = keyboardRef.current;

      if (!vkBox) return;
      vkBox.style.display =
        vkBox.style.display === "none" ? "inline-block" : "none";
    }

    const vkOpenBtn = document.querySelector(".vk-open-btn");
    vkOpenBtn?.addEventListener("click", handleOpenKeyboard);

    return () => {
      vkOpenBtn?.removeEventListener("click", handleOpenKeyboard);
    };
  }, []);

  return (
    <VKBox keyboardRef={keyboardRef}>
      <VKBoxHeader inputRef={inputRef} />
      <VKBoxBody inputRef={inputRef} />
    </VKBox>
  );
}

export default VirtualKeyboard;
