import * as Styled from '@compo/FidoForm/FidoForm.style';
import VisuallyHidden from '@/components/VisuallyHidden';
import useToggle from '@/hooks/use-toggle';
import React, { HTMLAttributes } from 'react';

interface UsernameProps extends HTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  minLength?: number;
  maxLength?: number;

  inputContent: string;
  labelContent: string;
  borderRadius?: number;
}

function Username(props: UsernameProps) {
  const { inputContent, labelContent, ...rest } = props;

  const [value, setValue] = React.useState('');
  const [isFocused, toggleIsFocused] = useToggle(false);

  return (
    <React.Fragment>
      <Styled.InputWrapper
        key={'id-wrapper'}
        $isUpper={true}
        $isLower={false}
        $borderRadius={props.borderRadius}
      >
        <label htmlFor="username">
          <VisuallyHidden>{labelContent}</VisuallyHidden>
        </label>
        <Styled.Input
          onFocus={toggleIsFocused}
          onBlur={toggleIsFocused}
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(() => currValue);
          }}
          aria-label={props.ariaLabel}
          aria-labelledby={props.ariaLabelledby}
          {...rest}
        />
        <Styled.Placeholder $isFocus={isFocused}>
          <span>{value.length > 0 ? '' : `${inputContent}`}</span>
        </Styled.Placeholder>
      </Styled.InputWrapper>
    </React.Fragment>
  );
}

const GoogleIcon = ({
  name,
  isFocused,
  ...delegated
}: {
  name: string;
  isFocused: boolean;
}) => {
  const color = isFocused
    ? 'oklch(16.73% 0.005 83 / 80%)'
    : 'oklch(16.73% 0.005 83 / 20%)';

  return (
    <span className="material-icons" {...delegated} style={{ color }}>
      {name}
    </span>
  );
};

export default Username;
