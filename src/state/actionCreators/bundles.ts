import { Dispatch } from 'redux';
import { BundleActionTypes } from '../actionTypes/bundles';
import { BundleAction } from '../actions';
import bundle from '../../helpers/esbuild';

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<BundleAction>) => {
    dispatch({
      type: BundleActionTypes.BUNDLE_START,
      payload: {
        cellId,
      }
    });

    const result = await bundle(input);

    dispatch({
      type: BundleActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      }
    }); 
  }
}