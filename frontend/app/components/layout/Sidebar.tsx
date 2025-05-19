import React from "react";
import { Button } from "../ui/Button";
import { Plus, Menu } from "lucide-react";

interface SidebarProps {
  open: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggle }) => {
  const jobs = ["Job #1", "Job #2", "Job #3"];

  return (
    <div className={`${open ? "w-64" : "w-16"} transition-all duration-300 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 shadow-sm`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
        <Button variant="ghost" onClick={toggle} className="text-gray-900 dark:text-gray-100">
          <Menu />
        </Button>
        {open && <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Jobs</span>}
      </div>
      <div className="p-4 space-y-2">
        <Button className="w-full" variant="outline" >
          <Plus className="mr-2 h-4 w-4" />
          {open && "New Job"}
        </Button>
        <div className="mt-4 space-y-2">
          {jobs.map((job, idx) => (
            <Button key={idx} variant="ghost" className="w-full justify-start text-gray-900 dark:text-gray-100">
              {open ? job : `#${idx + 1}`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
