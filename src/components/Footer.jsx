const Footer = () => {
    return (
        <footer>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top &#11014;</button>
        </footer>
    );
};

export default Footer;
