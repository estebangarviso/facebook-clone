import { styled } from '@mui/material/styles';

export const StyledMain = styled('main')`
  display: flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  min-height: 640px;

  > #left-column {
    max-width: 360px;
    width: 360px;
    min-width: 280px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    position: relative;
  }

  > #main-column {
    flex: 1;
    flex-basis: 744px;
    flex-wrap: nowrap;
    max-width: 100%;
    margin-bottom: 1rem;
    position: relative;
  }

  > #right-column {
    max-width: 360px;
    width: 360px;
    min-width: 280px;
    margin-left: 1rem;
    margin-bottom: 1rem;
    position: relative;
    perspective-origin: 'right top';
  }

  @media (max-width: 1100px) {
    > #left-column {
      display: none;
    }
  }

  @media (max-width: 900px) {
    > #right-column {
      display: none;
    }
  }
`;
