import Form from "../components/Form";
import Feed from "../components/Feed";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="homepage">
            <Nav />
            <Form />
            <Feed />
            <Footer />
        </div>
    );
};

export default Home;
