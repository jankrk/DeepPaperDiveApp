import React from "react";

interface Props {
  file: {
    id: number;
    filename: string;
  };
}

const FileCell: React.FC<Props> = ({ file }) => {
  return (
    <div className="border font-semibold bg-gray-50 p-2 flex items-center">
      {file.filename}<p>test</p>
    </div>
  );
};

export default FileCell;
