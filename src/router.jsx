import { useState, useEffect } from "react";
import AreaAluna from './AreaAluna.jsx';

export default function Router({ PainelApp }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  if (path === '/aluna' || path.startsWith('/aluna')) {
    return <AreaAluna />;
  }

  return <PainelApp />;
}
