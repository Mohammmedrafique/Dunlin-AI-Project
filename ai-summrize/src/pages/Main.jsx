

import { useState } from 'react';
import { Type, FileText, Loader2, Copy, Download, Trash2 } from 'lucide-react';

const Main = ({
  inputType,
  onInputTypeChange,
  mode,
  onModeChange,
  summaryLength,
  onSummaryLengthChange,
  inputText,
  onInputTextChange,
  outputText,
  onFileChange,
  isLoading,
  onSummarize,
  onCopy,
  onDownload,
  onClear,
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(e);
    }
  };

  const renderOutputText = () => {
    if (mode === "Bullet Points" && outputText) {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {outputText.split('\n').filter(point => point.trim() !== '').map((point, index) => (
            <li key={index}>{point.trim()}</li>
          ))}
        </ul>
      );
    }
    return <p>{outputText}</p>;
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-[#202F66]">
          AI Text Summarizer
        </h1>

        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => onInputTypeChange("text")}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded transition-all duration-300 ${
                inputType === "text"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              <Type className="mr-2" size={20} />
              Text Input
            </button>
            <button
              onClick={() => onInputTypeChange("pdf")}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded transition-all duration-300 ${
                inputType === "pdf"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              <FileText className="mr-2" size={20} />
              PDF Upload
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              className={`flex-1 px-4 py-2 rounded ${
                mode === "Paragraph"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => onModeChange("Paragraph")}
            >
              Paragraph
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded ${
                mode === "Bullet Points"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => onModeChange("Bullet Points")}
            >
              Bullet Points
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-1/4">Summary Length:</span>
          <input
            type="range"
            min="10"
            max="90"
            value={summaryLength}
            onChange={(e) => onSummaryLengthChange(e.target.value)}
            className="w-1/2 accent-[#16A34A]"
          />
          <span className="w-1/4 text-right">{summaryLength}%</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {inputType === "text" ? (
              <textarea
                className="w-full h-64 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                value={inputText}
                onChange={(e) => onInputTextChange(e.target.value)}
                placeholder="Enter text to summarize..."
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg">
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </label>
                {fileName && (
                  <p className="mt-2 text-xl pb-10 text-gray-800">{fileName}</p>
                )}
              </div>
            )}
            <div className="flex justify-between mt-2">
              <span>{inputText.split(" ").length} words</span>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                onClick={onSummarize}
                disabled={isLoading || (!inputText && inputType === "text") || (inputType === "pdf" && !fileName)}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Summarizing...
                  </span>
                ) : (
                  "Summarize"
                )}
              </button>
            </div>
          </div>
          <div>
            <div
              className="w-full h-64 p-3 border rounded-lg overflow-y-auto focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            >
              {renderOutputText()}
            </div>
            <div className="flex justify-between mt-2">
              <span>{outputText.split(" ").length} words</span>
              <div className="space-x-2">
                <button
                  className="text-blue-600 hover:text-red-800"
                  onClick={onCopy}
                >
                  <Copy className="inline-block w-5 h-5" />
                </button>
                <button
                  className="text-green-600 hover:text-green-800"
                  onClick={onDownload}
                >
                  <Download className="inline-block w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={onClear}
                >
                  <Trash2 className="inline-block w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;