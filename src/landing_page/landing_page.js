import React from 'react';
import StroganuffCow from './STROGANUFF_COW_2.png';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
                        Welcome to <span className="text-amber-600">Stroganoff</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        The ultimate destination for Stroganoff enthusiasts. Discover the perfect blend of tradition and innovation in every bite.
                    </p>
                    <div className="relative mx-auto max-w-3xl mb-16">
                        <img 
                            src={StroganuffCow} 
                            alt="Stroganuff Cow" 
                            className="rounded-xl shadow-2xl transform transition duration-500 hover:scale-105"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Stroganoff?</h2>
                        <p className="mt-4 text-gray-600">Experience the world's most comprehensive Stroganoff resource</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <div className="text-amber-600 mb-4">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">AI-Powered Recipes</h3>
                            <p className="text-gray-600">Get personalized Stroganoff recommendations using cutting-edge AI technology</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <div className="text-amber-600 mb-4">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Stroganomics</h3>
                            <p className="text-gray-600">Track global Stroganoff trends and market analysis</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <div className="text-amber-600 mb-4">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Community</h3>
                            <p className="text-gray-600">Share your Stroganoff confessions and connect with fellow enthusiasts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Premium Stroganoff Experience</h2>
                        <p className="mt-4 text-gray-600">Choose the perfect plan for your Stroganoff journey</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
                            <p className="text-4xl font-bold text-amber-600 mb-6">Free</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Basic Stroganoff recipes
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Community access
                                </li>
                            </ul>
                            <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition duration-300">
                                Get Started
                            </button>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-amber-600 transform scale-105">
                            <div className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                                Popular
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
                            <p className="text-4xl font-bold text-amber-600 mb-6">$9.99<span className="text-base font-normal">/mo</span></p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    All Starter features
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    AI recipe generation
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Market analysis
                                </li>
                            </ul>
                            <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition duration-300">
                                Start Pro Trial
                            </button>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
                            <p className="text-4xl font-bold text-amber-600 mb-6">Custom</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    All Pro features
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Custom AI models
                                </li>
                                <li className="flex items-center">
                                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Priority support
                                </li>
                            </ul>
                            <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition duration-300">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-amber-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Ready to Start Your Stroganoff Journey?</h2>
                    <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of Stroganoff enthusiasts and discover the perfect recipe for every occasion.
                    </p>
                    <button className="bg-white text-amber-600 py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300">
                        Get Started Today
                    </button>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
