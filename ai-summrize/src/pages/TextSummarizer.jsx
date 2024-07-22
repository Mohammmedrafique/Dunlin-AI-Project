import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Main from "./Main";
import MenuButton from "./MenuButton";

const TextSummarizer = () => {
  const [summaryLength, setSummaryLength] = useState(50);
  const [mode, setMode] = useState("Paragraph");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputType, setInputType] = useState("text");
  const [file, setFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const userId = localStorage.getItem("userid");
      const response = await axios.get(
        "https://ai-project-2-s7je.onrender.com/api/history",
        {
          params: { userId },
        }
      );
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    setOutputText("");

    try {
      let response;
      const userId = localStorage.getItem("userid");
      if (inputType === "text") {
        response = await axios.post(
          "https://ai-project-2-s7je.onrender.com/api/summarize-text",
          { text: inputText, userId, summaryLength, mode }
        );
      } else {
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("userId", userId);
        formData.append("summaryLength", summaryLength);
        formData.append("mode", mode);
        response = await axios.post(
          "https://ai-project-2-s7je.onrender.com/api/summarize-pdf",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      setOutputText(response.data.summary);
      fetchHistory();
    } catch (error) {
      console.error("Error:", error);
      setOutputText("An error occurred while summarizing.");
    }

    setIsLoading(false);
  };

  const handleInputTypeChange = (type) => {
    setInputType(type);
    setOutputText("");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const fileContent =
      outputText && typeof outputText === "string" ? outputText : "";
    const file = new Blob([fileContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const selectHistoryItem = async (id) => {
    try {
      const userId = localStorage.getItem("userid");
      const response = await axios.get(
        `https://ai-project-2-s7je.onrender.com/api/history/${id}`,
        { params: { userId } }
      );
      setInputType("text");
      setInputText(response.data.input);
      setOutputText(response.data.summary);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Error fetching history item:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        history={history}
        onSelectHistoryItem={selectHistoryItem}
      />
      <div className="flex-1 overflow-hidden">
        {isSidebarOpen ? (
          <img
            src="navanime.gif"
            alt=""
            className=" w-16 rounded-full md:hidden fixed top-0 left-4 z-30 "
          />
        ) : (
          <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        )}
        <Main
          inputType={inputType}
          onInputTypeChange={handleInputTypeChange}
          mode={mode}
          onModeChange={setMode}
          summaryLength={summaryLength}
          onSummaryLengthChange={setSummaryLength}
          inputText={inputText}
          onInputTextChange={setInputText}
          outputText={outputText}
          onFileChange={handleFileChange}
          isLoading={isLoading}
          onSummarize={handleSummarize}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onClear={handleClear}
        />
      </div>
    </div>
  );
};

export default TextSummarizer;
