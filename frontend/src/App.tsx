import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SubscriptionsPage from "./pages/SubscriptionsPage";
import SubscriptionDetailPage from "./pages/SubscriptionDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/subscriptions" replace />} />

        <Route path="/subscriptions" element={<SubscriptionsPage />} />

        <Route path="/subscriptions/:id" element={<SubscriptionDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
