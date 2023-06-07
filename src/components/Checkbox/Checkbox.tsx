import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

export function Checkbox({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <CheckboxContainer>
      <label htmlFor={name}>{label}</label>
      <input name={name} id={name} type="checkbox" checked={checked} onChange={onChange} />
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.tiny};
`;
