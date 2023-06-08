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
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput name={name} id={name} type="checkbox" checked={checked} onChange={onChange} />
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.tiny};
`;

const StyledLabel = styled.label`
  height: 20px;
`;

const StyledInput = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${(p) => p.theme.tokens.palette.deepOcean};
`;
