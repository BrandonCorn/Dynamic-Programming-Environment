import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, bundleActionCreators }  from '../state';

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...actionCreators,
    ...bundleActionCreators,
  }, dispatch);
}

