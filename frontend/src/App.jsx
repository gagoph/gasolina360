import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from "./layouts/AppLayout";
import BombaView from "./views/BombaView";
import ServiciosView from "./views/ServiciosView";
import TablaView from './views/TablaView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/bombas" replace />} />
        <Route path="bombas" element={<BombaView />} />
        <Route path="servicios" element={<ServiciosView />} />
        <Route path="tabla" element={<TablaView />} />
      </Route>
    </Routes>
  );
}

export default App;