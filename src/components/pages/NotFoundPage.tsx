import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>Страница не найдена. <Link to='/'>Домой</Link></div>
  );
}

export default NotFoundPage;