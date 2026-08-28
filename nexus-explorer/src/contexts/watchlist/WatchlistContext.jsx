import { createContext } from 'react';

// [REQ-14] A second Context, deliberately split into a state context and an actions context
export const WatchlistStateContext = createContext();
export const WatchlistActionsContext = createContext();
