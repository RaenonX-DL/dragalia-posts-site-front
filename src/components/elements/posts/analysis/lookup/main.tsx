import React from 'react';

import {useSession} from 'next-auth/client';

import {AnalysisLookupLandingResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../../utils/services/ga';
import {AdsInPostList} from '../../../common/ads/main';
import {useFetchState} from '../../../common/fetch';
import {AnalysisLookupLanding} from './in/landing';
import {AnalysisLookupInput} from './in/main';
import {InputData} from './in/types';
import {AnalysisLookupOutput} from './out/main';


export const AnalysisPostLookup = () => {
  const {lang} = useI18n();
  const [session] = useSession();

  const [inputForward, setInputForward] = React.useState<InputData>();
  const {
    fetchStatus: lookupLanding,
    fetchFunction: fetchLookupLanding,
  } = useFetchState<AnalysisLookupLandingResponse | null>(
    null,
    () => ApiRequestSender.analysisLookupLanding(session?.user.id.toString() || '', lang),
    'Failed to fetch the weapon type enums.',
  );

  fetchLookupLanding();

  return (
    <>
      <AdsInPostList/>
      <AnalysisLookupLanding analyses={lookupLanding.data?.analyses || []}/>
      <hr/>
      <AnalysisLookupInput
        onSearchRequested={(data) => () => {
          GoogleAnalytics.analysisLookup(data);
          setInputForward(data);
        }}
      />
      <AnalysisLookupOutput inputData={inputForward}/>
    </>
  );
};
