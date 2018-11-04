import {Component, ComponentClass } from "react";
import { Reducer } from "redux";

interface Glue {
  [index:string]: any;
}

interface DestructResult {
  reducers: Reducer<void & {}>,
  connect: (model: Glue) => (component: Component | ComponentClass) => ComponentClass,
  referToState: (model: Glue) => any,
}

interface Dispatch {
  (p: any): any;
}

interface GetState {
  (p?: any): any;
}

interface DestructParams {
  dispatch: Dispatch;
  getState: GetState;
  [index: string]: any;
}
interface DestructReturn {
  (structure: Glue): DestructResult;
}
interface Destruct {
  (p: DestructParams): DestructReturn;
}

export const destruct:Destruct;
