import React from 'react';

import {Collapse} from 'react-bootstrap';

import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {CategorizedConditionEnums, ElementEnums} from '../../../../../utils/services/resources/types/enums';
import {useFetchState} from '../../../common/fetch';
import {InputSectionBaseProps} from '../../props';
import {SectionAtk} from './sectionAtk';
import {SectionBuff} from './sectionBuff';
import {SectionCrt} from './sectionCrt';
import {SectionEx} from './sectionEx';
import {SectionFilter} from './sectionFilter';
import {SectionOther} from './sectionOther';
import {SectionPunisher} from './sectionPunisher';
import {SectionSkill} from './sectionSkill';
import {SectionTarget} from './sectionTarget';
import {InputData} from './types';


type InputParametersProps = InputSectionBaseProps<InputData> & {
  collapsed: boolean
}

export const InputParameters = ({collapsed, inputData, setInputData}: InputParametersProps) => {
  const [
    conditionEnums,
    ,
    fetchConditionEnums,
  ] = useFetchState<CategorizedConditionEnums>(
    {
      afflictions: [],
      elements: [],
    },
    ResourceLoader.getEnumCategorizedConditions,
    'Failed to fetch the condition enums.',
  );

  const [
    elemEnums,
    ,
    fetchElemEnums,
  ] = useFetchState<ElementEnums>(
    {
      elemental: [],
    },
    ResourceLoader.getEnumElements,
    'Failed to fetch the element enums.',
  );

  fetchConditionEnums();
  fetchElemEnums();

  return (
    <>
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
        </div>
      </Collapse>
      <SectionTarget
        inputData={inputData}
        setInputData={setInputData}
        conditionEnums={conditionEnums.data}
      />
      <hr/>
      <SectionFilter
        inputData={inputData}
        setInputData={setInputData}
        conditionEnums={conditionEnums.data}
        elementEnums={elemEnums.data}
      />
    </>
  );
};