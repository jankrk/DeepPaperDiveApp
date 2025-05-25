import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../components/AuthProvider";
import QuestionHeader from "../components/QuestionHeader";
import AnswerCell from "../components/AnswerCell";
import FileCell from "../components/FileCell"; 

interface Question { id: number; text: string; }
interface File { id: number; filename: string; }
interface Answer { id: number; file_id: number; question_id: number; }

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const auth = useAuth();

  const [jobName, setJobName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [answersMeta, setAnswersMeta] = useState<Answer[]>([]);

  useEffect(() => {
    fetch(`/jobs/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setJobName(data.name);
        setQuestions(data.questions);
        setFiles(data.files);
        setAnswersMeta(data.answers);
      });
  }, [id, auth.token]);

  return (
    <div className="p-4 w-full h-screen overflow-auto">
      <h1 className="text-2xl font-bold mb-4">{jobName}</h1>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `minmax(150px, auto) repeat(${questions.length}, minmax(120px, 1fr))`,
          gridAutoRows: "minmax(40px, auto)",
        }}
      >
        {/* PUSTY LEWY GÓRNY RÓG */}
        <div className="border bg-gray-100" />

        {/* Nagłówki pytań */}
        {questions.map((q) => (
          <QuestionHeader key={q.id} question={q} />
        ))}

        {/* Wiersze: nazwy plików + komórki z odpowiedziami */}
        {files.map((file) => (
          <React.Fragment key={file.id}>
            <FileCell file={file} />
            {questions.map((q) => {
              const answerMeta = answersMeta.find(
                (a) => a.question_id === q.id && a.file_id === file.id
              );
              return (
                <AnswerCell
                  key={`${file.id}_${q.id}`}
                  answerMeta={answerMeta}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default JobDetails;
