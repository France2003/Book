import Header from "../components/Header";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";
import HeaderCommitment from "../components/HeaderCommitment";
import BookCategory from "../components/BookCategory";


const DefaultLayout = () => {
    console.log("DefaultLayout");
    return (
        <div className="container mx-auto">
            <Header />
            <HeaderCommitment />

            <main>
            <div className="w-1/4 p-6 border-r">
                    <BookCategory />
                </div>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;