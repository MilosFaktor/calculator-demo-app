import CalculatorForm from "../components/CalculatorForm";
import "../css/Calculator.css";
import Footer from "../components/Footer";

function Calculator() {
    return (
        <div className="calculator-page">
            <CalculatorForm />
            <Footer />
        </div>
    );
}

export default Calculator;