import React, { useState } from "react";

import { useNavigate } from "react-router";
import { useAuth } from "../components/AuthProvider";


const JobCreate: React.FC = () => {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();


  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => setQuestions([...questions, ""]);

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files).filter(file => file.type === "application/pdf"));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type === "application/pdf");
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    questions.forEach(q => formData.append("questions", q));
    files.forEach(file => formData.append("files", file));

    try {
      const res = await fetch("/jobs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("submit res")
        console.log(data);
        navigate(`/dashboard/job/${data.id}`)
      } else {
        console.error("Server error:", res.status);
      }
    } catch (err: any) {
      console.error("Network error:", err.message);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className="min-h-screen w-full p-6 bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">New Job</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Job Name"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />

        {questions.map((q, i) => (
          <div key={i} className="flex space-x-2">
            <input
              type="text"
              value={q}
              onChange={(e) => handleQuestionChange(i, e.target.value)}
              placeholder={`Question ${i + 1}`}
              className="flex-grow p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button type="button" onClick={() => removeQuestion(i)} className="text-red-600">X</button>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded">
          Add Question
        </button>

        <div className={`border-2 border-dashed p-6 rounded ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
          <p className="text-gray-700 dark:text-gray-300">Drag & Drop PDF files here or click to upload</p>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-2"
          />
          <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {files.map((file, idx) => <li key={idx}>{file.name}</li>)}
          </ul>
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default JobCreate;
