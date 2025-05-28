import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "./layouts/AppLayout";
import BombaView from "./views/BombaView";
import ServiciosView from "./views/ServiciosView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/bombas" replace />} />
        <Route path="bombas" element={<BombaView />} />
        <Route path="servicios" element={<ServiciosView />} />
      </Route>
    </Routes>
  );
}

export default App;