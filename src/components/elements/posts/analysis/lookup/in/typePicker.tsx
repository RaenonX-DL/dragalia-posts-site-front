import React from 'react';

import {UnitType} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {CustomBoxes} from '../../../../common/check/customBox';
import {CheckEntry} from '../../../../common/check/types';
import {InputData} from './types';

type TypePickerProps = {
  inputData: InputData,
  setInputData: React.Dispatch<React.SetStateAction<InputData>>,
}

export const AnalysisTypePicker = ({inputData, setInputData}: TypePickerProps) => {
  const {t} = useI18n();

  const analysisTypes: Array<CheckEntry> = [
    {
      text: t((t) => t.posts.analysis.type.character),
      code: UnitType.CHARACTER,
    },
    {
      text: t((t) => t.posts.analysis.type.dragon),
      code: UnitType.DRAGON,
    },
  ];

  return (
    <>
      <CustomBoxes
        options={analysisTypes}
        inputData={inputData}
        setInputData={setInputData}
        inputKey="types"
      />
    </>
  );
};
