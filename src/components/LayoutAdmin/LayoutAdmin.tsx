import { AppSidebar } from "@/pages/pagesAdmin/AppSidebar/AppSidebar";

import { Outlet } from "react-router-dom";



const LayoutAdmin = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header/Sidebar */}
      <div className="lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:h-screen z-10">
  <AppSidebar />
</div>


      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 lg:pl-64"> {/* Ajuste para el sidebar */}
        <div className="p-4 md:p-6">
          <Outlet /> {/* Aquí se renderiza cada página */}
        </div>
      </main>

      
    </div>
  );
};

export default LayoutAdmin;