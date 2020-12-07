import * as user from './types';

export const fetchDevicesList = () => ({ type: user.FETCH_DEVICES_LIST });
export const saveSpeakersList = (payload) => ({ type: user.SAVE_SPEAKERS_LIST, payload });
export const saveMicsList = (payload) => ({ type: user.SAVE_MICS_LIST, payload });

export const setMicDevice = (payload) => ({ type: user.SET_MIC_DEVICE, payload });
export const setBellSpeaker = (payload) => ({ type: user.SET_BELL_SPEAKER, payload });
export const setCallSpeaker = (payload) => ({ type: user.SET_CALL_SPEAKER, payload });

export const checkCurrentSpeaker = (payload) => ({ type: user.CHECK_CURRENT_SPEAKER, payload });
export const setIsPlayingSpeaker = (payload) => ({ type: user.SET_IS_PLAYING_SPEAKER, payload });
export const saveIsPlayingSpeaker = (payload) => ({ type: user.SAVE_IS_PLAYING_SPEAKER, payload });
