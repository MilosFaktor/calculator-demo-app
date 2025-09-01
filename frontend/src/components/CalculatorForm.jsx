import { useState } from "react";
import { calculateCORS, calculateNOCORS } from "../services/api";
import "../css/CalculatorForm.css";

function CalculatorForm() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [operation, setOperation] = useState("add");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e, useNoCORS = false) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const fn = useNoCORS ? calculateNOCORS : calculateCORS;
            const data = await fn({ a: Number(a), b: Number(b), operation });
            setResult(data.result);
        } catch (err) {
            setError(err.message || "Calculation failed.");
        }
        setLoading(false);
    };

    return (
        <form className="calculator-form" onSubmit={(e) => handleSubmit(e, false)}>
            <div className="form-group">
                <label htmlFor="a">Input A:</label>
                <input
                    id="a"
                    type="number"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    required
                    className="calculator-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="operation">Operation:</label>
                <select
                    id="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="calculator-select"
                >
                    <option value="add">Add (+)</option>
                    <option value="subtract">Subtract (-)</option>
                    <option value="multiply">Multiply (×)</option>
                    <option value="divide">Divide (÷)</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="b">Input B:</label>
                <input
                    id="b"
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    required
                    className="calculator-input"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="calculator-btn"
                    disabled={loading}
                >
                    {loading ? "Calculating..." : "Calculate (CORS)"}
                </button>
            </div>
            <div>
                <button
                    type="button"
                    className="calculator-btn"
                    disabled={loading}
                    onClick={(e) => handleSubmit(e, true)}
                >
                    {loading ? "Calculating..." : "Calculate (No CORS)"}
                </button>
            </div>
            {result !== null && (
                <div className="calculator-result">
                    <strong>Result:</strong> {result}
                </div>
            )}
            {error && (
                <div className="calculator-error">
                    <strong>Error:</strong> {error}
                </div>
            )}
        </form>
    );
}

export default CalculatorForm;