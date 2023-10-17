import { useEffect } from "react";
import Banner from "../../Components/Banner/Banner";
import Brands from "../../Components/BrandsName/Brands";
import Aos from "aos";
import 'aos/dist/aos.css';

const Home = () => {
    useEffect(()=>{
        Aos.init()
    },[])
    return (
        <div>
            <Banner></Banner>
            <Brands></Brands>
        </div>
    );
};

export default Home;