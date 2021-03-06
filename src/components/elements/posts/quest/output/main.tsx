import React from 'react';

import {QuestPostGetResponse} from '../../../../../api-def/api';
import {GeneralPath, PostPath} from '../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {makePostPath} from '../../../../../utils/path/make';
import {AdsInPost} from '../../../common/ads/main';
import {Markdown} from '../../../markdown/main';
import {PostManageBar} from '../../manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../shared/output/alert';
import {PostInfo} from '../../shared/output/info';
import {QuestPositionOutput} from './positional';


type QuestPostOutputProps = {
  post: QuestPostGetResponse,
}

export const QuestPostOutput = ({post}: QuestPostOutputProps) => {
  const {t, lang} = useI18n();
  const context = React.useContext(AppReactContext);

  return (
    <>
      {
        context?.session?.user.isAdmin &&
        <PostManageBar
          newButtons={[{url: GeneralPath.QUEST_NEW}]}
          editPostUrl={makePostPath(PostPath.QUEST_EDIT, {pid: post.seqId, lang})}
        />
      }
      {post.isAltLang && <AlertIsAlternativeLanguage response={post}/>}
      {
        post.otherLangs.length > 0 &&
        <AlertOtherLanguageAvailable response={post} pid={post.seqId} targetPath={PostPath.QUEST}/>
      }

      <h3 className="mb-3">
        {t((t) => t.posts.quest.general)}
      </h3>
      <Markdown>{post.general}</Markdown>
      <hr/>
      <AdsInPost/>
      <h3 className="mb-3">
        {t((t) => t.posts.quest.video)}
      </h3>
      <Markdown>{post.video || 'N/A'}</Markdown>
      <AdsInPost/>
      <hr/>
      <h3 className="mb-3">
        {t((t) => t.posts.quest.positional)}
      </h3>
      <QuestPositionOutput info={post.positional}/>
      <hr/>
      {
        post.addendum &&
        <>
          <h3 className="mb-3">
            {t((t) => t.posts.quest.addendum)}
          </h3>
          <Markdown>{post.addendum}</Markdown>
          <hr/>
        </>
      }
      <AdsInPost/>
      <PostInfo post={post}/>
    </>
  );
};
