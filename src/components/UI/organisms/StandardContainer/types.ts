import { FC } from '@/types';
import { ReactNode } from 'react';

export type StandardContainerProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export type StandardContainerFC = FC<StandardContainerProps>;
