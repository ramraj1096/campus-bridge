import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const languages = [
  { label: "Python", value: "python", id: 71 },
  { label: "C++", value: "cpp", id: 54 },
  { label: "Java", value: "java", id: 62 },
  { label: "JavaScript", value: "javascript", id: 63 },
];

export default function CodeEditor() {
  const [language, setLanguage] = useState("python");
  const [languageId, setLanguageId] = useState(71);
  const [code, setCode] = useState("# Write your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          language_id: languageId,
          source_code: code,
          stdin: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "b95877f4b8msh08732d5f68c0a86p13c1ecjsn04eba1090c2a",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const result = response.data;
      if (result.stderr) {
        setOutput(result.stderr);
      } else {
        setOutput(result.stdout || "No output");
      }
    } catch (err) {
      console.error(err);
      setOutput("Error while executing code.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Code Editor</h2>

          <select
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={language}
            onChange={(e) => {
              const selected = languages.find(
                (lang) => lang.value === e.target.value
              );
              setLanguage(e.target.value);
              setLanguageId(selected?.id || 71);
            }}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Code Editor */}
        <Editor
          height="400px"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || "")}
        />

        {/* Input / Output / Actions */}
        <div className="p-6 space-y-6 bg-gray-50">
          {/* Input */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Custom Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter custom input (if any)..."
              className="w-full p-3 text-sm border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Run Button */}
          <div>
            <button
              onClick={runCode}
              disabled={loading}
              className={`px-5 py-2 rounded-md text-white font-medium transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
          </div>

          {/* Output */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Output
            </label>
            <textarea
              value={output}
              readOnly
              className="w-full p-3 text-sm bg-gray-900 text-white rounded-md font-mono"
              rows={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
