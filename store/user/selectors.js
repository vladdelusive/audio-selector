import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| Data
|--------------------------------------------------------------------------
*/

const _getSpeakers = (state) => state.user.speakers;
const _getMics = (state) => state.user.mics;

export const getCurrentCallDevice = createSelector(
	[_getSpeakers],
	speakers => speakers.callDevice
);

export const getCurrentBellDevice = createSelector(
	[_getSpeakers],
	speakers => speakers.bellDevice
);

export const getSpeakersList = createSelector(
	[_getSpeakers],
	speakers => speakers.list || []
);

export const getMicsList = createSelector(
	[_getMics],
	mics => mics.list || []
);

export const getMicDevice = createSelector(
	[_getMics],
	mics => mics.micDevice
);

export const getIsPlayingSpeaker = createSelector(
	[_getSpeakers],
	speakers => speakers.devicePlaying
);
