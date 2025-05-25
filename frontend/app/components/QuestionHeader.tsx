import React from "react";

interface Props {
  question: {
    id: number;
    text: string;
  };
}

const QuestionHeader: React.FC<Props> = ({ question }) => (
  <div className="font-bold border p-2 bg-gray-200 text-center" title={question.text}>
    {question.text}
  </div>
);

export default QuestionHeader;
