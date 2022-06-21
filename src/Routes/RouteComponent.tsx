import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentUI from '../components/Container/PaymentUI/PaymentUI';

export const RouteComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaymentUI />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteComponent;
