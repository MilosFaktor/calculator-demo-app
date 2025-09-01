import  "../css/Footer.css";

function  Footer() {
    return (
        <footer className="home-footer">
                <span>
                    Created by Milos Faktor &middot; Serverless API Demo
                </span>
                <div className="home-footer-links">
                    <a href="https://github.com/MilosFaktor" target="_blank" rel="noopener noreferrer" className="footer-link">
                        GitHub
                    </a>
                    {" | "}
                    <a href="https://linkedin.com/in/milos-faktor-78b429255" target="_blank" rel="noopener noreferrer" className="footer-link">
                        LinkedIn
                    </a>
                </div>
            </footer>
    )
}

export default Footer;