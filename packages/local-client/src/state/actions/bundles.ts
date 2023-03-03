import { BundleActionTypes } from '../actionTypes/bundles';

export interface BundleCellStartAction {
  type: BundleActionTypes.BUNDLE_START,
  payload: {
    cellId: string;
  }
}

export interface BundleCellCompleteAction {
  type: BundleActionTypes.BUNDLE_COMPLETE,
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    }
  }
}

export type BundleAction = BundleCellStartAction | BundleCellCompleteAction; 