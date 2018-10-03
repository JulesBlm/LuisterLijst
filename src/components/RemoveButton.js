import styled from 'styled-components';

const RemoveButton = styled.button`
  position: fixed;
  top: -10px;
  left: -10px;
  padding: 6px 9px;
  border-radius: 25px;
  background-color: crimson;
  color: white;
  transition: 0.1s cubic-bezier(0.175,0.885,0.320,1.275);

  &:hover {
    transform: scale(1.1);
    background-color: coral;
  }
`;

export default RemoveButton;