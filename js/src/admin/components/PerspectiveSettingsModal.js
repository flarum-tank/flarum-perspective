/*
 * (c) 2019  Matthew Kilgore <matthew@kilgore.dev>
 *
 *  For the full copyright and license information, please view the LICENSE
 *  file that was distributed with this source code.
 *
 */

import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class PerspectiveSettingsModal extends SettingsModal {
  title() {
    return app.translator.trans('perspective.admin.settings.title');
  }

  form() {
    return [
      m('.Form-group', [
        m('label', app.translator.trans('perspective.admin.settings.field.api_key')),
        m('input[type=text].FormControl', {
          bidi: this.setting('perspective.api_key')
        })
      ]),
      m('.Form-group', [
        m('label', app.translator.trans('perspective.admin.settings.field.threshold')),
        m('input[type=number][max=100].FormControl', {
          bidi: this.setting('perspective.threshold')
        })
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.usemax')() > 0,
          onchange: this.setting('perspective.usemax'),
          children: app.translator.trans('perspective.admin.settings.usemax'),
        })),
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.useexperimental')() > 0,
          onchange: this.setting('perspective.useexperimental'),
          children: app.translator.trans('perspective.admin.settings.useexperimental'),
        })),
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.models.toxicity')() > 0,
          onchange: this.setting('perspective.models.toxicity'),
          children: app.translator.trans('perspective.admin.settings.field.toxicity'),
        })),
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.models.threat')() > 0,
          onchange: this.setting('perspective.models.threat'),
          children: app.translator.trans('perspective.admin.settings.field.threat'),
        })),
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.models.profanity')() > 0,
          onchange: this.setting('perspective.models.profanity'),
          children: app.translator.trans('perspective.admin.settings.field.profanity'),
        })),
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.models.sexually_explicit')() > 0,
          onchange: this.setting('perspective.models.sexually_explicit'),
          children: app.translator.trans('perspective.admin.settings.field.sexually_explicit'),
        })),
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.models.flirtation')() > 0,
          onchange: this.setting('perspective.models.flirtation'),
          children: app.translator.trans('perspective.admin.settings.field.flirtation'),
        })),
      ]),
      m('.Form-group', [
        m('label', Switch.component({
          state: this.setting('perspective.donotstore')() > 0,
          onchange: this.setting('perspective.donotstore'),
          children: app.translator.trans('perspective.admin.settings.donotstore'),
        })),
      ]),
    ]
  }
}
