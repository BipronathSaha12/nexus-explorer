import React, { useState } from 'react';

const CrashTest = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('User initiated Crash Test');
  }

  return (
    <button className="crash-button" onClick={() => setShouldCrash(true)}>
      Crash Test
    </button>
  );
};

export default CrashTest;
