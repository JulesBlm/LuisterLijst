import styled from 'styled-components';

const StyledClear = styled.button`
  width: 80px;
  opacity: 0.2;
  padding: 15px;
  position: absolute;
  top: 20px;
  right: 50px;
  color: white;
  background: coral;
  border: 2px #eee solid;
  font-size: 0.5em;
  border-radius: 8px;

  &:hover {
    background: mediumpurple;
    opacity: 0.8;
  }
`;

export default StyledClear;