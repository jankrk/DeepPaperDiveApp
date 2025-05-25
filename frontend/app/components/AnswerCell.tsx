import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../components/AuthProvider";

interface Props {
  answerMeta?: {
    id: number;
    question_id: number;
    file_id: number;
  };
}

interface PollAnswerStatus {
  status: "pending" | "done";
  answer_text?: string;
}

const AnswerCell: React.FC<Props> = ({ answerMeta }) => {
  const auth = useAuth();
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!answerMeta) return;

    const poll = async () => {
      try {
        const res = await fetch(`/answers/${answerMeta.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!res.ok) {
          console.error("Server error while polling");
          return;
        }

        const data: PollAnswerStatus = await res.json();
        console.log(data)
        if (data.status === "done" && data.answer_text) {
          setText(data.answer_text);
          setLoading(false);
          if (pollingRef.current) clearInterval(pollingRef.current);
        } else {
          setLoading(true);
        }
      } catch (e) {
        console.error("Polling error:", e);
      }
    };

    poll(); // Initial call
    pollingRef.current = setInterval(poll, 5000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [answerMeta, auth.token]);

  if (!answerMeta) {
    return (
      <div className="border p-2 text-gray-400 italic text-center">
        brak odpowiedzi
      </div>
    );
  }

  return (
    <div className="border p-2 text-center whitespace-pre-wrap text-ellipsis overflow-hidden">
      {loading ? (
        <span className="text-gray-400 italic animate-pulse">
          Loading...
        </span>
      ) : (
        text
      )}
    </div>
  );
};

export default AnswerCell;
