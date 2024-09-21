import Header from "../components/Header";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";
import HeaderCommitment from "../components/HeaderCommitment";


const DefaultLayout = () => {
    console.log("DefaultLayout");
    return (
        <div className="container mx-auto">
            <div className="haeder">
                <Header />
                <HeaderCommitment />
            </div>
            <main>

                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;