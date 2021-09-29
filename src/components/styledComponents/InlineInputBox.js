import styled from 'styled-components'


const InlineInputBox = styled.div`
  display: grid;
  background-color: #293139;
  border-radius: 1rem;
  padding: 2rem;
  gap: 1rem;
  grid-auto-flow: column;
  justify-content: start;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default InlineInputBox