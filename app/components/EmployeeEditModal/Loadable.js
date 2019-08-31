/**
 *
 * Asynchronously loads the component for ShadowBox
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
