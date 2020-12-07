import * as user from './types';
import { createReducer } from 'utils';

const initialState = {
	speakers: {
		callDevice: {},
		bellDevice: {},
		list: [],
		devicePlaying: {
			device: null,
			isPlaying: false,
		}
	},
	mics: {
		micDevice: {},
		list: [],
	},
};

export const userReducer = createReducer(initialState, {
	[user.SET_CALL_SPEAKER](state, action) {
		const { payload } = action
		return {
			...state,
			speakers: {
				...state.speakers,
				callDevice: payload
			}
		};
	},

	[user.SET_BELL_SPEAKER](state, action) {
		const { payload } = action
		return {
			...state,
			speakers: {
				...state.speakers,
				bellDevice: payload
			}
		};
	},

	[user.SET_MIC_DEVICE](state, action) {
		const { payload } = action
		return {
			...state,
			mics: {
				...state.mics,
				micDevice: payload
			}
		};
	},

	[user.SAVE_MICS_LIST](state, action) {
		const { payload } = action
		return {
			...state,
			mics: {
				...state.mics,
				list: payload
			}
		};
	},

	[user.SAVE_SPEAKERS_LIST](state, action) {
		const { payload } = action
		return {
			...state,
			speakers: {
				...state.speakers,
				list: payload
			}
		};
	},

	[user.SAVE_IS_PLAYING_SPEAKER](state, action) {
		const { payload } = action
		const { device, isPlaying } = payload
		return {
			...state,
			speakers: {
				...state.speakers,
				devicePlaying: {
					device,
					isPlaying
				}
			}
		};
	},
});
