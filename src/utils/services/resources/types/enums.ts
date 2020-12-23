import {MultiLangText} from './text';


export type EnumEntry = {
  name: string,
  code: number,
  trans: MultiLangText
}


export type ConditionEnumEntry = EnumEntry & {
  colorTheme: string
};


export type AllConditionEnums = Record<string, ConditionEnumEntry>;


export type CategorizedConditionEnums = {
  afflictions: Array<EnumEntry>,
  elements: Array<EnumEntry>,
}


export type ElementEnums = {
  elemental: Array<EnumEntry>,
}