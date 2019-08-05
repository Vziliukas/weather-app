import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const SelectField = styled.div`
  margin: 16px 0;

  .label {
    margin: 8px 0;
    font-weight: bold;
  }
`

export default ({ label, ...props }) => (
  <SelectField>
    {label && <div className="label">
      {label}
    </div>}
    <Select
      {...props}
    />
  </SelectField>
)