import { Outlet } from "react-router-dom"
import { useState } from "react";
import Header from "./Header"
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <div className="dark:bg-boxdark-2 dark:text-bodydark">
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          {/* max-w-screen-2xl */}
          <div className="mx-auto  p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </main>
        <ToastContainer />
      </div>
    </div>
  </div>
}