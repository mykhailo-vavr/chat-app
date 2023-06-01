import { StandardContainer } from '@/components/UI/organisms';
import { size } from '@/utils';
import styled from 'styled-components';

export const Wrapper = styled(StandardContainer)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: ${size(48)};

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${size(16)};
  }
`;

export const MessagesWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${size(10)};
  padding: ${size(16)};
  border-radius: ${size(16)};
  background: #eee;
  height: 70vh;
  overflow-y: scroll;

  & > :first-child {
    margin-top: auto;
  }

  .empty {
    font-weight: 600;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }

  .message-box {
    display: flex;
    align-items: center;
    gap: ${size(10)};

    .text {
      padding: ${size(10)} ${size(16)};
    }

    .date {
      color: #444;
    }
  }

  .left {
    justify-content: start;

    .text {
      border-radius: ${size(4)} ${size(16)} ${size(16)};
      background: #ecc;
    }
  }

  .right {
    justify-content: flex-start;
    flex-direction: row-reverse;

    .text {
      border-radius: ${size(16)} ${size(16)} ${size(4)};
      background: #cce;
    }
  }
`;

export const SendMessageWrapper = styled.div`
  display: flex;
  gap: ${size(10)};

  .input {
    flex: 1;
  }
`;
