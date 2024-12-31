'use client';
import { FC, ReactNode } from 'react';

import { MarkersProvider } from '@/context/MarkersContext';

type Props = {
  children: ReactNode;
};

const MainAppLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <MarkersProvider>{children}</MarkersProvider>
    </>
  );
};
export default MainAppLayout;
