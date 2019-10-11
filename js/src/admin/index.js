import app from 'flarum/app';

import PerspectiveSettingsModal from './components/PerspectiveSettingsModal';

app.initializers.add('tank-perspective', app => {
  app.extensionSettings['tank-perspective'] = () => app.modal.show(new PerspectiveSettingsModal());
});
