/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  admin: {
    id: `${scope}.admin`,
    defaultMessage: 'admin',
  },
  employee: {
    id: `${scope}.employee`,
    defaultMessage: 'Employee',
  },
});