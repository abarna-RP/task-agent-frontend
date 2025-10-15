import React, { useState } from "react";
import API from "../api/api";

export default function AIAnalyzer() {
    const [brief, setBrief] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeBrief = async () => {
        if (!brief.trim()) {
            alert("Please enter a project brief");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/ai/analyze", { brief });
            setResult(response.data);
        } catch (error) {
            console.error("AI Analysis error:", error);
            alert("AI analysis failed");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-bold mb-4">🤖 AI Project Coordinator</h2>
            
            <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe your project (e.g., 'Build a task management app with user authentication and file upload')"
                className="w-full p-3 border rounded mb-4"
                rows="4"
            />
            
            <button
                onClick={analyzeBrief}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                    loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {loading ? "AI Analyzing..." : "Analyze with AI"}
            </button>

            {result && (
                <div className="mt-6 p-4 bg-gray-50 rounded">
                    <h3 className="font-bold mb-3">AI Generated Task Breakdown:</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h4 className="font-semibold text-green-600">Frontend Tasks</h4>
                            <ul className="list-disc list-inside">
                                {result.tasks.frontend.map((task, index) => (
                                    <li key={index} className="text-sm">{task}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-blue-600">Backend Tasks</h4>
                            <ul className="list-disc list-inside">
                                {result.tasks.backend.map((task, index) => (
                                    <li key={index} className="text-sm">{task}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-purple-600">Database Tasks</h4>
                            <ul className="list-disc list-inside">
                                {result.tasks.database.map((task, index) => (
                                    <li key={index} className="text-sm">{task}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}