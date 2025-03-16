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
            handleButtonClick();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        <span className="text-amber-600">A.I.</span> Powered by Stroganoff
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Ask anything and get an AI response with a stroganoff twist!
                    </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={prompt}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your prompt here"
                            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                        />
                        <button 
                            onClick={handleButtonClick} 
                            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                
                {loading && (
                    <div className="flex justify-center my-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">Error: {error.message}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {data && (
                    <div className="bg-white rounded-xl shadow-lg p-6 my-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Response:</h2>
                        <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 text-gray-700 whitespace-pre-wrap">
                            {data}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StroganoffAi;
