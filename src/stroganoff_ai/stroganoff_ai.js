import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const StroganoffAi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prompt, setPrompt] = useState("");

    const fetchData = async (concatenatedPrompt) => {
        setLoading(true);
        setError(null);
        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = await model.generateContent(concatenatedPrompt);
            setData(result.response.text());
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => setPrompt(e.target.value);

    const handleButtonClick = () => {
        const concatenatedPrompt = `${prompt}, also explain the relationship to stroganoff`;
        if (prompt.trim() !== "") {
            fetchData(concatenatedPrompt);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleButtonClick(); // Trigger the same logic as the submit button
        }
    };

    return (
        <div className="container">
            <h1>A.I. Powered by Stroganoff</h1>
            <input
                type="text"
                value={prompt}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Add the onKeyDown event
                placeholder="Enter your prompt here"
                className="input-box"
            />
            <button onClick={handleButtonClick} className="submit-btn">
                Submit
            </button>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">Error: {error.message}</div>}
            {data && <pre className="response">{data}</pre>}
        </div>
    );
};

export default StroganoffAi;
