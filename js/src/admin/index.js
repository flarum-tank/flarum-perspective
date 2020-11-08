/*
 * (c) 2019  Matthew Kilgore <matthew@kilgore.dev>
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 *
 */

import { settings } from '@fof-components';

const {
  SettingsModal,
  items: { StringItem, NumberItem, BooleanItem },
} = settings;

app.initializers.add('tank/perspective', () => {
  app.extensionSettings['tank-perspective'] = () =>
    app.modal.show(SettingsModal, {
      title: app.translator.trans('tank-perspective.admin.settings.title'),
      size: 'medium',
      className: 'FofPreventNecrobumping--Settings',
      items: (s) => [
        <div className="Form-group">
          <label>{app.translator.trans('tank-perspective.admin.settings.field.api_key')}</label>
          <StringItem name="perspective.api_key" simple required setting={s} />

          <p className="helpText">{app.translator.trans('tank-perspective.admin.settings.api_key_help')}</p>
        </div>,
        <div className="Form-group">
          <label>{app.translator.trans('tank-perspective.admin.settings.field.threshold')}</label>
          <NumberItem name="perspective.threshold" simple required min="0" max="100" setting={s} />

          <p className="helpText">{app.translator.trans('tank-perspective.admin.settings.threshold_help')}</p>
        </div>,
        <div className="Form-group">
          <BooleanItem name="perspective.usemax" state="true" setting={s}>
            {app.translator.trans('tank-perspective.admin.settings.usemax')}
          </BooleanItem>
          <p className="helpText">{app.translator.trans('tank-perspective.admin.settings.maxscore_help')}</p>
        </div>,
        <div className="Form-group">
          <BooleanItem name="perspective.donotstore" state="false" setting={s}>
            {app.translator.trans('tank-perspective.admin.settings.donotstore')}
          </BooleanItem>
          <p className="helpText">{app.translator.trans('tank-perspective.admin.settings.donotstore_help')}</p>
        </div>,
        <div className="Form-group">
          <BooleanItem name="perspective.useexperimental" state="false" setting={s}>
            {app.translator.trans('tank-perspective.admin.settings.useexperimental')}
          </BooleanItem>
          <p className="helpText">{app.translator.trans('tank-perspective.admin.settings.experimental_help')}</p>
        </div>,
        <BooleanItem name="perspective.models.toxicity" state="false" setting={s}>
          {app.translator.trans('tank-perspective.admin.settings.field.toxicity')}
        </BooleanItem>,
        <BooleanItem name="perspective.models.threat" state="false" setting={s}>
          {app.translator.trans('tank-perspective.admin.settings.field.threat')}
        </BooleanItem>,
        <BooleanItem name="perspective.models.profanity" state="false" setting={s}>
          {app.translator.trans('tank-perspective.admin.settings.field.profanity')}
        </BooleanItem>,
        <BooleanItem name="perspective.models.sexually_explicit" state="false" setting={s}>
          {app.translator.trans('tank-perspective.admin.settings.field.sexually_explicit')}
        </BooleanItem>,
        <BooleanItem name="perspective.models.flirtation" state="false" setting={s}>
          {app.translator.trans('tank-perspective.admin.settings.field.flirtation')}
        </BooleanItem>,
      ],
    });
});
