// deprecated
import { useState, useRef } from 'react';
import { FieldContainer, FieldInput, FieldTextarea, FieldLabel, FieldSubmit } from './styles';
export const Input = ({ name, label, type, value, onChange, ...otherProps }) => {
  const inputRef = useRef();
  const [shrink, setShrink] = useState(false);
  const handleChange = (e) => {
    setShrink(inputRef.current.value !== '');
    if (onChange) onChange(e);
  };

  return (
    <FieldContainer>
      <FieldInput
        ref={inputRef}
        shrink={shrink}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        {...otherProps}
      />
      {!otherProps.placeholder && (
        <FieldLabel shrink={shrink} htmlFor={name}>
          {label}
        </FieldLabel>
      )}
    </FieldContainer>
  );
};

export const Textarea = ({ name, label, value, onChange, ...otherProps }) => {
  const inputRef = useRef();
  const [shrink, setShrink] = useState(false);
  const handleChange = (e) => {
    setShrink(inputRef.current.value !== '');
    if (onChange) onChange(e);
  };
  return (
    <FieldContainer>
      <FieldTextarea ref={inputRef} shrink={shrink} name={name} value={value} onChange={handleChange} {...otherProps} />
      {!otherProps.placeholder && (
        <FieldLabel shrink={shrink} htmlFor={name}>
          {label}
        </FieldLabel>
      )}
    </FieldContainer>
  );
};

export const Submit = ({ children, ...otherProps }) => {
  return (
    <FieldSubmit type='submit' {...otherProps}>
      {children}
    </FieldSubmit>
  );
};
