import styled from 'styled-components'
import NumberFormat from 'react-number-format';


const MyNumberFormat = styled(NumberFormat)`
  & .MuiFormLabel-root {
    color: #fff !important;
  }

  & .MuiInputBase-root {
    color: #fff !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }
`;

export default MyNumberFormat