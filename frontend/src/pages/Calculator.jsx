import CalculatorForm from "../components/CalculatorForm";
import "../css/Calculator.css";
import AuthPanel from "../components/AuthPanel";
import Footer from "../components/Footer";

function Calculator() {
    return (
        <div className="calculator-page">
            <CalculatorForm />
            <AuthPanel />
            <Footer />
        </div>
    );
}

export default Calculator;