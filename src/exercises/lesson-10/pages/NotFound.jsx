import { Link, useLocation } from 'react-router-dom';

const lessonBasePath = '/lessons/lesson-10';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>
        No route matches <code>{pathname}</code>.
      </p>
      <p>
        <Link to={lessonBasePath}>Back Home</Link>
      </p>
    </section>
  );
}
