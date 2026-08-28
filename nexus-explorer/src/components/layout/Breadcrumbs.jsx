import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // [REQ-6] useEffect with no dependency array (runs on every render)
  // Updating document.title based on the current route
  useEffect(() => {
    const titleBase = 'Nexus Explorer';
    if (pathnames.length === 0) {
      document.title = `${titleBase} - Dashboard`;
    } else {
      const pageTitle = pathnames[0].charAt(0).toUpperCase() + pathnames[0].slice(1);
      document.title = `${titleBase} - ${pageTitle}`;
    }
  }); // No dependency array!

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumb-link">Explore</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <React.Fragment key={name}>
            <span className="breadcrumb-separator">›</span>
            {isLast ? (
              <span className="breadcrumb-current">{name}</span>
            ) : (
              // [REQ-10] Link used for navigation
              <Link to={routeTo} className="breadcrumb-link">{name}</Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
