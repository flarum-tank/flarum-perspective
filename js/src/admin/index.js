/*
 * (c) 2019  Matthew Kilgore <matthew@kilgore.dev>
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 *
 */

import app from 'flarum/app';

import PerspectiveSettingsModal from './components/PerspectiveSettingsModal';

app.initializers.add('tank-perspective', app => {
  app.extensionSettings['tank-perspective'] = () => app.modal.show(new PerspectiveSettingsModal());
});
