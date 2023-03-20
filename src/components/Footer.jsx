const Footer = () => {
    return (
        <footer>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ⬆️</button>
        </footer>
    );
};

export default Footer;
