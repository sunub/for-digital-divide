import LoadingAnimation from "@/components/LoadingAnimation";

function Loading() {
  return (
    <div
      style={{
        display: "grid",
        width: "100cqw",
        height: "87cqh",
        placeContent: "center",
      }}
    >
      <LoadingAnimation />
    </div>
  );
}

export default Loading;
