import Sidebar from "../components/Sidebar";
import {Outlet} from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
