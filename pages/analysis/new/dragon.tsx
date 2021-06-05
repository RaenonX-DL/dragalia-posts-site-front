import React from 'react';

import {UnitType} from '../../../src/api-def/api';
import {AnalysisFormDragonNew} from '../../../src/components/elements/posts/analysis/form/dragonNew';
import {useI18n} from '../../../src/i18n/hook';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';


// FIXME: If not admin, redirect

const AnalysisNewDragon = () => {
  const {lang} = useI18n();

  return (
    <AnalysisFormDragonNew
      initialPayload={{
        googleUid: getCookies(CookiesKeys.GOOGLE_UID) || '',
        lang: lang,
        type: UnitType.DRAGON,
        unitId: 0,
        summary: '',
        summonResult: '',
        passives: '',
        normalAttacks: '',
        ultimate: '',
        notes: '',
        suitableCharacters: '',
        videos: '',
        story: '',
        keywords: '',
      }}
      fnSendRequest={ApiRequestSender.analysisPublishDragon}
    />
  );
};

export default AnalysisNewDragon;