import React from 'react';

import {AnalysisGetResponse} from '../../../../../api-def/api';
import {GeneralPath, makePostPath, PostPath} from '../../../../../const/path';
import {useI18n} from '../../../../../i18n/hook';
import {AdsInPost} from '../../../common/ads';
import {PostManageBar} from '../../manageBar';
import {AlertIsAlternativeLanguage, AlertOtherLanguageAvailable} from '../../shared/output/alert';
import {PostInfo} from '../../shared/output/info';
import {SectionBottom} from './bottom';
import {SectionTop} from './top';

type AnalysisOutputBaseProps<R extends AnalysisGetResponse> = {
  analysis: R,
  renderBody: (post: R) => React.ReactElement,
}


export const AnalysisOutputBase = <R extends AnalysisGetResponse>({
  analysis,
  renderBody,
}: AnalysisOutputBaseProps<R>) => {
  const {t, lang} = useI18n();

  return (
    <>
      {
        analysis.isAdmin &&
        <PostManageBar
          newButtons={[
            {
              url: GeneralPath.ANALYSIS_NEW_CHARA,
              title: t((t) => t.posts.manage.addChara),
            },
            {
              url: GeneralPath.ANALYSIS_NEW_DRAGON,
              title: t((t) => t.posts.manage.addDragon),
            },
          ]}
          editPostUrl={makePostPath(PostPath.ANALYSIS_EDIT, {lang, pid: analysis.unitId})}
        />
      }
      {analysis.isAltLang && <AlertIsAlternativeLanguage response={analysis}/>}
      {
        analysis.otherLangs.length > 0 &&
        <AlertOtherLanguageAvailable response={analysis} pid={analysis.unitId} targetPath={PostPath.ANALYSIS}/>
      }

      <SectionTop analysis={analysis}/>
      <AdsInPost/>
      {renderBody(analysis)}
      <SectionBottom analysis={analysis}/>
      <AdsInPost/>

      <hr/>

      <PostInfo post={analysis}/>
    </>
  );
};
