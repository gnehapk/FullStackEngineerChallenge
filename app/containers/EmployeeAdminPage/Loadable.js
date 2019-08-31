/**
 *
 * Asynchronously loads the component for EmployeeAdminPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
