import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { LogOut } from "lucide-react";

import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router";


const Topbar: React.FC = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/auth/me", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
      }
    }

    fetchProfile();
  }, [auth.token]);


  const handleLogout = async () => {
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setMessage("Logged out successfully");
        auth.logout();
        navigate("/");
      } else {
        setMessage("Logout failed");
      }
    } catch (error) {
      setMessage("Logout failed: " + error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 shadow-sm border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome, {name}!</h1>
        <Button variant="ghost" className="text-red-600 dark:text-red-400 flex" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {message && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded shadow-lg">
          {message}
          <button
            onClick={() => setMessage(null)}
            className="ml-4 text-red-400 font-bold"
          >
            X
          </button>
        </div>
      )}

    </>
  );
};

export default Topbar;
