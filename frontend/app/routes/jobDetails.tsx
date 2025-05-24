import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../components/AuthProvider";

const JobDetails = () => {
  const { id } = useParams();
  const [jobName, setJobName] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [files, setFiles] = useState<{ id: number; filename: string }[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stopped, setStopped] = useState(false);
  const auth = useAuth();
  

  useEffect(() => {
    fetch(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        }})
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setJobName(data.name);
        setQuestions(data.questions);
        setFiles(data.files);
        setStopped(data.stopped);
      });
  }, [id]);
  

  const fetchAnswer = async (questionId: number, fileId: number) => {
    const key = `${questionId}_${fileId}`;
    if (answers[key]) return;
    setAnswers((prev) => ({ ...prev, [key]: "loading" }));
    const res = await fetch(`/api/answer?question_id=${questionId}&file_id=${fileId}`);
    const data = await res.json();
    setAnswers((prev) => ({ ...prev, [key]: data.text || "brak odpowiedzi" }));
  };

  const stopJob = async () => {
    await fetch(`/api/job/${id}/stop`, { method: "POST" });
    setStopped(true);
  };

  return (
    <div className="w-full h-screen overflow-auto">
      <div className="p-4 flex justify-between items-center bg-white shadow sticky top-0 z-10">
        <h1 className="text-2xl font-semibold">{jobName}</h1>
        {!stopped && (
          <button onClick={stopJob} className="px-4 py-2 bg-red-600 text-white rounded">STOP</button>
        )}
      </div>
      <div className="overflow-auto">
        <table className="min-w-max border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-10 p-2 border">Plik / Pytanie</th>
              {questions.map((q, i) => (
                <th key={i} className="bg-white p-2 border text-left">{q}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td className="sticky left-0 bg-white z-10 p-2 border whitespace-nowrap">
                  <a
                    href={`/job_files/${id}/${file.filename}`}
                    download
                    className="text-blue-600 underline"
                  >
                    {file.filename}
                  </a>
                </td>
                {questions.map((_, qi) => {
                  const qId = qi + 1; // assuming question_id is index + 1
                  const key = `${qId}_${file.id}`;
                  const value = answers[key];
                  useEffect(() => {
                    fetchAnswer(qId, file.id);
                  }, []);
                  return (
                    <td key={key} className="p-2 border text-sm w-48 h-24 align-top">
                      {value === "loading" ? (
                        <div className="animate-pulse text-gray-400">Loading...</div>
                      ) : (
                        value || ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobDetails;