import Footer from "../components/Footer";
import AuthPanel from "../components/AuthPanel";
import "../css/Home.css";

const VITE_DEV_TITLE = import.meta.env.VITE_DEV_TITLE;

function Home() {
    return (
        <div className="home-container">
            <h1>{VITE_DEV_TITLE}</h1>
            <h1 className="home-title">Calculator Demo App</h1>
            <p className="home-description">
                This is a demo React application created to showcase building a custom frontend, setting up a React project, and connecting it to my existing API.<br />
                The calculator runs on AWS Lambda and is accessed via API Gateway using a POST request.<br /><br />
                <strong>Deployment:</strong> Served through AWS CloudFront with two origins:<br />
                - API Gateway (for the backend)<br />
                - S3 (for the static frontend)<br /><br />
                <strong>Step 1:</strong> Try the calculator directly.
            </p>
            <div className="home-actions">
                <a href="/Calculator" className="home-link">
                    Try the Calculator
                </a>
            </div>
            <p className="home-description">
                <strong>Step 2:</strong> Test authentication with Amazon Cognito.
            </p>
            <AuthPanel />
            <Footer />
        </div>
    );
}
 
export default Home;