import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="container not-found-content">
        <h1>404</h1>
        <p>Looks like this page doesn't exist.</p>
        <button onClick={() => navigate('/')}>
          Go Back Home
        </button>
      </div>
    </div>
  )
}