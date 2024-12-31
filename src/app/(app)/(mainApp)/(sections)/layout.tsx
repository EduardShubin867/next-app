import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const KrasnoeBedstvieLayout: FC<Props> = ({ children }) => {
  return <div className="h-screen">{children}</div>;
};

export default KrasnoeBedstvieLayout;
