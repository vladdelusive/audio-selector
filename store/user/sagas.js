import { delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { saveSpeakersList, setCallSpeaker, setBellSpeaker, saveIsPlayingSpeaker, saveMicsList, setMicDevice } from './actions';
import * as user from './types';
import checkAudio from 'assets/audio/check-audio3.7.mp3';
import { getCurrentBellDevice, getCurrentCallDevice } from './selectors';
import { storeAudioOutputs } from 'store/storeAudioOutputs';
import { noty } from 'utils';
import { changeMicDevice } from 'utils/sip';

const setCallDeviceLS = (speaker) => window.localStorage.setItem("callSpeaker", JSON.stringify(speaker))
const setBellDeviceLS = (speaker) => window.localStorage.setItem("bellSpeaker", JSON.stringify(speaker))
const setMicDeviceLS = (mic) => window.localStorage.setItem("micDevice", JSON.stringify(mic))

export const getCallDeviceLS = () => JSON.parse(window.localStorage.getItem("callSpeaker"))
export const getBellDeviceLS = () => JSON.parse(window.localStorage.getItem("bellSpeaker"))
export const getMicDeviceLS = () => JSON.parse(window.localStorage.getItem("micDevice"))

export function getAccessToAudio() {
	if (!navigator.getUserMedia) {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
		if (navigator.mozGetUserMedia) {
			noty("error", "Mozilla audio outputs is not supported")
			return
		}
	}
	if (navigator.getUserMedia) {
		navigator.getUserMedia({ audio: true }, () => {
			storeAudioOutputs()
		}, () => { })
	}
}


function* fetchDevicesListSaga() {
	const devices = yield navigator.mediaDevices.enumerateDevices();

	const audiooutputDevices = [];
	const audioinputDevices = [];
	devices.forEach((device) => {
		if (device.kind === 'audiooutput') {
			audiooutputDevices.push(device)
		} else if (device.kind === 'audioinput') {
			audioinputDevices.push(device)
		}
	})
	yield put(saveSpeakersList(audiooutputDevices));
	yield put(saveMicsList(audioinputDevices));

	const micDeviceFromLS = yield getMicDeviceLS()
	if (micDeviceFromLS && audioinputDevices.some(device => device.deviceId === micDeviceFromLS.deviceId)) {
		yield put(setMicDevice(micDeviceFromLS));
	} else {
		yield put(setMicDevice(audioinputDevices[0]));
	}

	const callDeviceFromLS = yield getCallDeviceLS()
	if (callDeviceFromLS && audiooutputDevices.some(device => device.deviceId === callDeviceFromLS.deviceId)) {
		yield put(setCallSpeaker(callDeviceFromLS));
	} else {
		yield put(setCallSpeaker(audiooutputDevices[0]));
	}

	const bellDeviceFromLS = yield getBellDeviceLS()
	if (bellDeviceFromLS && audiooutputDevices.some(device => device.deviceId === bellDeviceFromLS.deviceId)) {
		yield put(setBellSpeaker(bellDeviceFromLS));
	} else {
		yield put(setBellSpeaker(audiooutputDevices[0]));
	}
}

function* setCallSpeakerSaga(action) {
	const { payload } = action
	yield setCallDeviceLS(payload)
}

function* setMicDeviceSaga(action) {
	const { payload } = action
	yield setMicDeviceLS(payload)
	yield changeMicDevice()
}

function* setBellSpeakerSaga(action) {
	const { payload } = action
	yield setBellDeviceLS(payload)
}

function* checkCurrentSpeakerSaga(action) {
	const { payload } = action
	const audio = document.querySelector('audio');
	if (audio.src) audio.src = null
	audio.src = checkAudio

	let currentCheckDevice
	if (payload === "call") {
		yield put(saveIsPlayingSpeaker({ device: "call", isPlaying: true }))
		currentCheckDevice = yield select(getCurrentCallDevice)
	} else if (payload === "bell") {
		yield put(saveIsPlayingSpeaker({ device: "bell", isPlaying: true }))
		currentCheckDevice = yield select(getCurrentBellDevice)
	}
	yield audio.setSinkId(currentCheckDevice.deviceId);

	// the check device sound goes 3.7 sec
	yield delay(3700)
	audio.src = null
	yield put(saveIsPlayingSpeaker({ device: null, isPlaying: false }))
}

export function* userSaga() {
	yield takeEvery(user.FETCH_DEVICES_LIST, fetchDevicesListSaga);

	yield takeLatest(user.SET_CALL_SPEAKER, setCallSpeakerSaga);
	yield takeLatest(user.SET_BELL_SPEAKER, setBellSpeakerSaga);
	yield takeLatest(user.SET_MIC_DEVICE, setMicDeviceSaga);

	yield takeLatest(user.CHECK_CURRENT_SPEAKER, checkCurrentSpeakerSaga);
}
