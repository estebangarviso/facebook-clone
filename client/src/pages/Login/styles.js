import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 100%;
  gap: 2rem;
  padding: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;
