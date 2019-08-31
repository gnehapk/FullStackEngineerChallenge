/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: 'Review Management Web Application',
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      by {author}.
    `,
  },
});
