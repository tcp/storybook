import React, { FC, ChangeEvent, useCallback, useState } from 'react';
import { styled } from '@storybook/theming';

import { Form } from '../form';
import { ControlProps, ArrayValue, ArrayConfig } from './types';

const parse = (value: string, separator: string): ArrayValue =>
  !value || value.trim() === '' ? [] : value.split(separator);

const format = (value: ArrayValue | undefined, separator: string) => {
  return value && Array.isArray(value) ? value.join(separator) : '';
};

const Wrapper = styled.label({
  display: 'flex',
});

export type ArrayProps = ControlProps<ArrayValue> & ArrayConfig;
export const ArrayControl: FC<ArrayProps> = ({
  name,
  value,
  onChange,
  separator = ',',
  onBlur,
  onFocus,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>): void => {
      const { value: newVal } = e.target;
      onChange(parse(newVal, separator));
    },
    [onChange]
  );

  const [forceVisible, setForceVisible] = useState(false);
  const onForceVisible = useCallback(() => {
    onChange([]);
    setForceVisible(true);
  }, [setForceVisible]);
  if (value === undefined) {
    return <Form.Button onClick={onForceVisible}>Set array</Form.Button>;
  }

  const isValid = Array.isArray(value);
  return (
    <Wrapper>
      <Form.Textarea
        id={name}
        value={format(value, separator)}
        onChange={handleChange}
        size="flex"
        placeholder="Edit array..."
        valid={isValid ? null : 'error'}
        autoFocus={forceVisible}
        {...{ name, onBlur, onFocus }}
      />
    </Wrapper>
  );
};
