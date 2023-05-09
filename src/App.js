import Reviews from './Reviews';
import AddReviewForm from './AddReviewForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/form" element={<AddReviewForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
