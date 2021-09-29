import styled from 'styled-components'

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: auto 300px;
  gap: 1rem;
  padding: 1rem 0;
  align-items: start;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export default TwoCol