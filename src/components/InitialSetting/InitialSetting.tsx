class Cursor {
  constructor() {}
}

function InitCursor() {}

function InitialSetting() {
  const boundFn = String(InitCursor);
  const calledFunction = `(${boundFn})()`;

  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
}

export default InitialSetting;
