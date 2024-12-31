import { FC, ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

import Navigation from '@/app/components/Navigation';
import 'react-toastify/dist/ReactToastify.css';

type MainAppLayoutProps = {
  children: ReactNode;
};

const MainAppLayout: FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <Navigation />
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};
export default MainAppLayout;
