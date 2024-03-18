type LoginAction = {
  type:
    | 'wrongId'
    | 'wrongPassword'
    | 'wrongLengthID'
    | 'wrongLengthPassword'
    | 'error';
};

type ErrorMessage = {
  message: string;
};

interface Setters {
  focus: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputStatus = {
  insert: boolean;
  confirm: boolean;
};

type FocusStatus = {
  focusStatus: InputStatus;
  setFocusStatus: React.Dispatch<React.SetStateAction<InputStatus>>;
};

type Setter = {
  status: InputStatus;
  setter: React.Dispatch<React.SetStateAction<InputStatus>>;
};

interface FunctionKey {
  symbol: string;
  rowIndex: number;
  columnIndex: number;
}

interface Keypad {
  functionKeys: FunctionKey[];
  size: {
    rows: number;
    columns: number;
  };
  svgGrid: string[][];
}

interface CreateKeypadResponse {
  uid: string;
  keypad: Keypad;
}

interface InputResultType {
  insert: {
    uid: string;
    coords: Array<{ x: number; y: number }>;
  };
  confirm: {
    uid: string;
    coords: Array<{ x: number; y: number }>;
  };
}

type ContextValue = {
  focusing: InputStatus;
  length: number;
  inputResult: InputResultType;
};

type ContextValueSetting = {
  data: ContextValue;
  setter: React.Dispatch<React.SetStateAction<ContextValue>>;
};
