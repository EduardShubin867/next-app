import { FC, ReactNode } from 'react';
import Navigation from '@/app/components/Navigation';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '@/auth';

type MainAppLayoutProps = {
    children: ReactNode;
};

const MainAppLayout: FC<MainAppLayoutProps> = ({ children }) => {
    const authComp = auth();
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
