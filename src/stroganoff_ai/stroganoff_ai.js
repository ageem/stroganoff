import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const StroganoffAi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prompt, setPrompt] = useState('');

    const fetchData = async (concatenatedPrompt) => {
        setLoading(true);
        setError(null);
        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
            const result = await model.generateContent(concatenatedPrompt);
            setData(result.response.text());
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleButtonClick = () => {
        const concatenatedPrompt = `${prompt} , also explain the relationship to stroganoff`;
        if (prompt.trim() !== '') {
            fetchData(concatenatedPrompt);
        }
    };

    return (
        <div className="context-box">
            <h1>A.I. Powered by Stroganoff</h1>
            <input
                type="text"
                value={prompt}
                onChange={handleInputChange}
                placeholder="Enter your prompt here"
            />
            <button onClick={handleButtonClick}>Submit</button>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && <pre>{data}</pre>}
        </div>
    );
};

export default StroganoffAi;
