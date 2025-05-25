import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/Button";
import { Plus, Menu } from "lucide-react";

import { useAuth } from "../AuthProvider";


interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

interface Job {
  id: number;
  name: string;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggle }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch("/jobs", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    }

    fetchJobs();
  }, []);


  return (
    <div className={`${open ? "w-64" : "w-16"} transition-all duration-300 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 shadow-sm`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <Button variant="ghost" onClick={toggle} className="text-gray-900 dark:text-gray-100">
          <Menu />
        </Button>
        {open && <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Jobs</span>}
      </div>
      <div className="p-4 space-y-2">
        <Button className="w-full" variant="outline" onClick={() => navigate("/dashboard")}>
          <Plus className="mr-2 h-4 w-4" />
          {open && "New Job"}
        </Button>
        <div className="mt-4 space-y-2">
          {jobs.length === 0 ? (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              No jobs yet. Click "New Job" to create one.
            </div>
          ) : (
            jobs.map((job) => (
              <Button
                key={job.id}
                variant="ghost"
                className="w-full justify-start text-gray-900 dark:text-gray-100"
                onClick={() => navigate(`/dashboard/job/${job.id}`)}
              >
                {open ? job.name : `#${job.id}`}
              </Button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
