import React, { useState } from "react";

const NewJobForm: React.FC = () => {
  const [questions, setQuestions] = useState([""]);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    questions.forEach((q) => formData.append("questions", q));
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
    }

    const res = await fetch("http://localhost:8000/jobs/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    alert("Job submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-gray-100 dark:bg-gray-800 space-y-4 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">New Job</h2>

        {questions.map((q, i) => (
            <input
            key={i}
            type="text"
            value={q}
            onChange={(e) => handleQuestionChange(i, e.target.value)}
            placeholder={`Question ${i + 1}`}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        ))}

        <button
            type="button"
            onClick={addQuestion}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
            Add Question
        </button>

        <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setFiles(e.target.files)}
            className="block text-gray-700 dark:text-gray-300"
        />

        <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
            Submit
        </button>
    </form>

  );
};

export default NewJobForm;
