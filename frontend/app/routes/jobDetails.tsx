import React, { useState } from "react";

const JobDetails = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <h1 className="text-2xl font-bold">JobDetails</h1>
    </div>
  );
};

export default JobDetails;
