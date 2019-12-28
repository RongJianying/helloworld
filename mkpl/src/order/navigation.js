import React from 'react';

export const routerStateContextRef = React.createContext(null);

export const useRouterState = () => React.useContext(routerStateContextRef);
