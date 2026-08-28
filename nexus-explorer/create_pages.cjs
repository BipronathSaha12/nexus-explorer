const fs = require('fs');
const path = require('path');

const pages = ['DashboardPage', 'CharacterListPage', 'CharacterDetailPage', 'EpisodeListPage', 'LocationListPage', 'WatchlistPage', 'ComparePage', 'SettingsPage', 'NotFoundPage'];

pages.forEach(page => {
  const content = `import React from 'react';

const ${page} = () => {
  return <div>${page}</div>;
};

export default ${page};
`;
  fs.writeFileSync(path.join(__dirname, 'src', 'pages', `${page}.jsx`), content);
});

const appShellContent = `import React from 'react';
import { Outlet } from 'react-router-dom';

const AppShell = () => {
  return (
    <div className='app-shell'>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
`;
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'layout', 'AppShell.jsx'), appShellContent);
