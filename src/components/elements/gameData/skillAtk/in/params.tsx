import React from 'react';

import Collapse from 'react-bootstrap/Collapse';

import {CategorizedConditionEnums} from '../../../../../api-def/resources';
import {InputSectionBaseProps} from '../../props';
import {SectionAtk} from './sections/atk';
import {SectionBuff} from './sections/buff';
import {SectionCrt} from './sections/crt';
import {SectionEx} from './sections/ex';
import {SectionOther} from './sections/other';
import {SectionPunisher} from './sections/punisher';
import {SectionSkill} from './sections/skill';
import {SectionTarget} from './sections/target';
import {InputSummary} from './summary';
import {InputData} from './types';


type InputParametersProps = InputSectionBaseProps<InputData> & {
  collapsed: boolean,
  conditionEnums: CategorizedConditionEnums,
}

export const InputParameters = ({collapsed, inputData, setInputData, conditionEnums}: InputParametersProps) => {
  return (
    <>
      <Collapse in={collapsed}>
        <div>
          <InputSummary inputData={inputData} conditionEnums={conditionEnums}/>
        </div>
      </Collapse>
      <Collapse in={!collapsed}>
        <div>
          <SectionAtk inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionBuff inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionEx inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionCrt inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionSkill inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionPunisher inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionOther inputData={inputData} setInputData={setInputData}/>
          <hr/>
          <SectionTarget inputData={inputData} setInputData={setInputData} conditionEnums={conditionEnums}/>
        </div>
      </Collapse>
    </>
  );
};
