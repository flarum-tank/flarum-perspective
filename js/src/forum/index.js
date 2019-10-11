import { extend, override } from 'flarum/extend';
import app from 'flarum/app';

import PostControls from 'flarum/utils/PostControls';
import CommentPost from 'flarum/components/CommentPost';

app.initializers.add('flarum-perspective', () => {
  extend(PostControls, 'destructiveControls', function(items, post) {
    if (items.has('approve')) {
      const flags = post.flags();

      if (flags && flags.some(flag => flag.type() === 'perspective')) {
        items.get('approve').props.children = app.translator.trans('perspective.forum.post.not_toxic_button');
      }
    }
  });

  override(CommentPost.prototype, 'flagReason', function(original, flag) {
    if (flag.type() === 'perspective') {
      return app.translator.trans('perspective.forum.post.perspective_flagged_text');
    }

    return original(flag);
  });
}, -20); // run after the approval extension
