import HomeProducts from "../components/HomeProducts";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
    return (

        <div className="home-layout">
            <Navbar />
            <HomeProducts />
        </div>

    );
}

export default HomeLayout;