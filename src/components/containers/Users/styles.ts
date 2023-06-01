import { StandardContainer } from '@/components/UI/organisms';
import { size } from '@/utils';
import styled from 'styled-components';

export const Wrapper = styled(StandardContainer)``;

export const FiltersWrapper = styled.div`
  border-bottom: ${size(1)} solid #ccc;
  margin-bottom: ${size(10)};

  h3 {
    margin-bottom: ${size(10)};
  }

  .form {
    display: flex;
    gap: ${size(10)};
  }
`;
