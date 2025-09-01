import Footer from "../components/Footer";
import "../css/Home.css";

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Calculator Demo App</h1>
            <p className="home-description">
                This is a demo React application created to showcase building a custom frontend, setting up a React project, and connecting it to my existing API.<br />
                The calculator runs on AWS Lambda and is accessed via API Gateway using a POST request.<br /><br />
                <strong>Deployment:</strong> This website is served through AWS CloudFront with two origins: one for the API (API Gateway) and one for the static website (S3).
            </p>
            <div className="home-actions">
                <a href="/Calculator" className="home-link">
                    Try the Calculator
                </a>
            </div>
            <Footer />
        </div>
    );
}

export default Home;