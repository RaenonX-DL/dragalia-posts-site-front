import React from 'react';

import {useSession} from 'next-auth/client';

import {QuestPostPublishPayload} from '../../../src/api-def/api';
import {QuestPostForm} from '../../../src/components/elements/posts/quest/form/main';
import {PostFormState} from '../../../src/components/elements/posts/shared/form/types';
import {useI18n} from '../../../src/i18n/hook';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {generateNewPositionInfo} from '../../../src/utils/services/api/utils';


// FIXME: [Blocked by Auth Rework] If not admin, redirect

const QuestNew = () => {
  const {lang} = useI18n();
  const [session] = useSession();

  const [formState, setFormState] = React.useState<PostFormState<QuestPostPublishPayload>>({
    payload: {
      uid: session?.user.id.toString() || '',
      lang: lang,
      title: '',
      video: '',
      general: '',
      positional: [
        generateNewPositionInfo(),
      ],
      addendum: '',
    },
    isIdAvailable: false,
    isPreloaded: false,
  });

  return (
    <QuestPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.questPublish}
    />
  );
};

export default QuestNew;
