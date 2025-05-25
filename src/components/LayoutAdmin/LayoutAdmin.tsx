import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/pagesAdmin/AppSidebar/AppSidebar";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header/Sidebar */}
      <div className="fixed top-0 left-0 right-0 z-10">
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