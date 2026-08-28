import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MdDashboard, MdPeople, MdTv, MdPlace, MdStar, MdSettings } from 'react-icons/md';
import { characterListUrl } from '../../api/endpoints';
import { get } from '../../api/http';

const fetchCharacterCount = async () => {
  const data = await get(characterListUrl({}));
  return data.info.count;
};

const Sidebar = () => {
  const { data: count } = useQuery({
    queryKey: ['characters', 'totalCount'],
    queryFn: fetchCharacterCount,
    staleTime: 5 * 60 * 1000,
  });

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <MdDashboard /> },
    { name: 'Characters', path: '/characters', icon: <MdPeople />, count: count },
    { name: 'Episodes', path: '/episodes', icon: <MdTv />, count: 51 }, // API says 51
    { name: 'Locations', path: '/locations', icon: <MdPlace />, count: 126 }, // API says 126
    { name: 'Watchlist', path: '/watchlist', icon: <MdStar /> },
    { name: 'Settings', path: '/settings', icon: <MdSettings /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Link to="/">
          <div className="brand-logo">N</div>
          <div className="brand-text">
            <h1>Nexus Explorer</h1>
            <span>Character Intelligence</span>
          </div>
        </Link>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">EXPLORE</p>
        <nav>
          <ul>
            {navItems.slice(0, 4).map((item) => (
              <li key={item.name}>
                {/* [REQ-10] NavLink, with the active style produced by NavLink’s isActive */}
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-name">{item.name}</span>
                  {item.count && <span className="nav-count">{item.count}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">PERSONAL</p>
        <nav>
          <ul>
            {navItems.slice(4).map((item) => (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-name">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
