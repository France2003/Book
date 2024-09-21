import Header from "../components/Header";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";


const DefaultLayout = () => {
    console.log("DefaultLayout");
    return (
        <div className="container mx-auto">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;