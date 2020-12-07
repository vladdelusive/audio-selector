import { store } from './index';
import { fetchDevicesList } from './user/actions';

export const storeAudioOutputs = () => {
	store.dispatch(fetchDevicesList());
};
