/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'home';

export default defineMessages({
  startProjectHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: 'Full Stack Developer Challenge',
  },
  startProjectMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage:
      `Admin view ->>> 
      Add/remove/update/view employees
      Add/update/view performance reviews
      Assign employees to participate in another employee's performance review
      Employee view ->>> 
      List of performance reviews requiring feedback
      Submit feedback`,
  },
  trymeHeader: {
    id: `${scope}.tryme.header`,
    defaultMessage: 'Try me!',
  },
  trymeMessage: {
    id: `${scope}.tryme.message`,
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: `${scope}.tryme.atPrefix`,
    defaultMessage: '@',
  },
});
