import { ChangeEventHandler } from "react";
import styled from "styled-components";

export function Select({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <SelectBox name={name} value={value} onChange={onChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </SelectBox>
  );
}

const SelectBox = styled.select`
  height: 35px;
  width: 30vw;
`;
