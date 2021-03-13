/*
 * (c) 2019  Matthew Kilgore <matthew@kilgore.dev>
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 *
 */
import app from 'flarum/app';

app.initializers.add('tank/perspective', () => {
  app.extensionData.for('tank-perspective')
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.field.api_key'),
      setting: 'perspective.api_key',
      type: 'text'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.field.threshold'),
      setting: 'perspective.threshold',
      type: 'int'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.usemax'),
      setting: 'perspective.usemax',
      type: 'bool'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.donotstore'),
      setting: 'perspective.donotstore',
      type: 'bool'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.useexperimental'),
      setting: 'perspective.useexperimental',
      type: 'bool'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.field.toxicity'),
      setting: 'perspective.models.toxicity',
      type: 'bool'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.field.threat'),
      setting: 'perspective.models.threat',
      type: 'bool'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.field.profanity'),
      setting: 'perspective.models.profanity',
      type: 'bool'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.field.sexually_explicit'),
      setting: 'perspective.models.sexually_explicit',
      type: 'bool'
    })
    .registerSetting({
      label: app.translator.trans('tank-perspective.admin.settings.field.flirtation'),
      setting: 'perspective.models.flirtation',
      type: 'bool'
    })
});
