import * as React from 'react';
export default React.createContext({
  user: null,
  logout: () => {},
  login: () => {},
});
