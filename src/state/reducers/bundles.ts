import produce from 'immer';
import { BundleActionTypes } from "../actionTypes";
import { BundleAction, BundleCellCompleteAction, BundleCellStartAction } from "../actions";

interface IBundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    error: string;
  }
}

const initialState: IBundleState = { }

const bundleStart = (state: IBundleState, action: BundleCellStartAction) => {
  state[action.payload.cellId] = {
    loading: true,
    code: '',
    error: '',
  }
}

const bundleComplete = (state: IBundleState, action: BundleCellCompleteAction) => {
  state[action.payload.cellId] = {
    loading: false,
    code: action.payload.bundle.code,
    error: action.payload.bundle.error,
  }
}

const reducer = produce((state = initialState, action: BundleAction): IBundleState => {
  // const { cellId } = action.payload;

  switch(action.type){
    case BundleActionTypes.BUNDLE_START:
      bundleStart(state, action);
      // state[cellId] = {
      //   loading: true,
      //   code: '',
      //   error: '',
      // }
      return state;
    case BundleActionTypes.BUNDLE_COMPLETE:
      bundleComplete(state, action);
      // const { bundle } = action.payload;
      // state[cellId] = {
      //   loading: false,
      //   code: bundle.code,
      //   error: bundle.error,
      // }
      return state;
    default: 
      return state;
  }
}, initialState);

export default reducer;