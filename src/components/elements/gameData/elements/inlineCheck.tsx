import React from 'react';

import {InlineCheckBase, InlineCheckBaseProps} from './inlineCheckBase';
import {InputProps} from './props';
import {TitledProps} from './types';


type InlineCheckProps<K extends string, T extends { [key in K]: boolean }> =
  TitledProps &
  Partial<InlineCheckBaseProps> &
  InputProps<K, boolean, T>


export const InlineCheck = <K extends string, T extends { [key in K]: boolean }>({
  titleLabel,
  inputData,
  inputKey,
  setInputData,
  ...props
}: InlineCheckProps<K, T>) => {
  return (
    <InlineCheckBase
      {...props}
      titleLabel={titleLabel}
      groupName={inputKey}
      checked={inputData[inputKey]}
      onChange={(checked) => setInputData({...inputData, [inputKey]: checked})}
    />
  );
};
