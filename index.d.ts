import {ComponentClass, ReactElement} from "react";

interface Glue {
  [index:string]: any;
}

interface DestructResult {
  reducers: Reducer<void & {}, Action<any>>,
  connect: (model: Glue) => (component: ComponentClass) => ReactElement<any>,
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
