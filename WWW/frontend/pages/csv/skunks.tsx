import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CSVUploadForm = () => {
  const [csvFile, setCSVFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [csvData, setCSVData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("p0");

  useEffect(() => {
    fetchData("p0");
  }, []);

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
    fetchData(e.target.value);
  };

  const fetchData = async (priority) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://mj.sag17.tech/getfile/${priority}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setCSVData(data.fileData);
        toast.success("File fetched successfully!");
      } else {
        setMessage("An error occurred while uploading the file.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("An error occurred while fetching the data.");
      toast.error("Error fetching data!");
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    setLoading(true);

    const file = e.target.files[0];
    setCSVFile(file);
    setFileName(file.name);

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!csvFile || !fileName) {
      setMessage("Please select a CSV/TXT file and enter a file name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await fetch(
        `https://mj.sag17.tech/upload/${selectedPriority}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setCSVData(data.fileData);
        toast.success("File uploaded successfully!");
      } else {
        setMessage("An error occurred while uploading the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading the file.");
      toast.error("Error uploading file!");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 p-4">
      <Toaster />
      <h2 className="text-4xl font-bold text-white">Skunks Server</h2>

      <h2 className="text-lg font-bold">CSV/TXT Upload</h2>
      <div className="flex flex-col">
        <label htmlFor="prioritySelect" className="mb-1 text-white">
          Select Priority:
        </label>
        <select
          id="prioritySelect"
          value={selectedPriority}
          onChange={handlePriorityChange}
          className="rounded border p-2"
        >
          <option value="p0">Priority 0</option>
          <option value="p1">Priority 1</option>
          <option value="p2">Priority 2</option>
          <option value="p3">Priority 3</option>
          <option value="p4">Priority 4</option>
          <option value="p5">Priority 5</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="fileInput" className="mb-1 text-white">
            Select CSV/TXT File:
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".csv, .txt"
            className="rounded border p-2"
          />
        </div>

        <button type="submit" className="btn-primary btn normal-case">
          Upload
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : null}
      <div className="rounded border p-4">
        <h3 className="mb-2 text-lg font-semibold">
          Preview of CSV/TXT Data in Server
        </h3>
        <ul className="list-disc pl-6">
          {csvData.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CSVUploadForm;
