import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex bg-[#f0ffff] min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
