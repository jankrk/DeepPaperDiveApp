import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { Outlet, Navigate, useNavigate } from "react-router";
import { useAuth } from "../components/AuthProvider";



const Layout = () => {
    // const { token } = useAuth();

    // // Jeśli nie ma tokena, przekieruj do loginu
    // if (!token) {
    //     return <Navigate to="/login" replace />;
    // }


    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
        <Sidebar open={sidebarOpen} toggle={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex flex-col flex-1">
            <Topbar />
            <div className="overflow-auto">
                <Outlet /> 
            </div>
        </div>
        </div>
  );
};

export default Layout;
