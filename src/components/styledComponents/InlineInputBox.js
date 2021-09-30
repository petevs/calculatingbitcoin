import styled from 'styled-components'


const InlineInputBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  background-color: #293139;
  border-radius: 1rem;
  padding: 2rem;
  gap: 1rem;
  justify-content: start;
  width: max-content;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default InlineInputBox