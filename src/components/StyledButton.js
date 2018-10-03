import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  padding: 20px;
  border: 0px;
  background-color: white;
  border-radius: 2px;

  &[disabled] {
    background-color: steelblue;
      color: aliceblue;
      border: 2px solid #005baa;
    cursor: not-allowed;	
  }
`;

export default StyledButton;