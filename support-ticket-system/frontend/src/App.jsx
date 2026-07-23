import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout/PageLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import TicketListPage from './pages/TicketListPage/TicketListPage';
import TicketDetailsPage from './pages/TicketDetailsPage/TicketDetailsPage';
import CreateTicketPage from './pages/CreateTicketPage/CreateTicketPage';
import EditTicketPage from './pages/EditTicketPage/EditTicketPage';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketListPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailsPage />} />
          <Route path="/tickets/:id/edit" element={<EditTicketPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
