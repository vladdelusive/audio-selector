import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Select, Button, Divider } from 'antd';
import { obj2options } from 'utils';
import { getCurrentCallDevice, getCurrentBellDevice, getIsPlayingSpeaker, getSpeakersList, getMicsList, getMicDevice } from 'store/user/selectors';
import { setBellSpeaker, setCallSpeaker, checkCurrentSpeaker, setMicDevice } from 'store/user/actions';
import { getAccessToAudio } from 'store/user/sagas';

const SettingsDevices = (props) => {
    const {
        setBellSpeaker,
        setCallSpeaker,
        speakersList,
        currentCallDevice,
        currentBellDevice,
        checkCurrentSpeaker,
        isPlayingState,
        micsList,
        currentMicDevice,
        setMicDevice,
    } = props;

    useEffect(() => {
        getAccessToAudio()
    }, [])

    return (
        <Row style={{ width: 400, margin: "auto auto 20px" }}>
            <Col>
                <Row>
                    <Divider style={{
                        fontSize: 16,
                        fontWeight: 500,
                        marginBottom: 10,
                    }}>Выберите аудиовыход для входящего звонка</Divider>
                </Row>
                <Row>
                    <Col>
                        <Select
                            style={{ width: "100%" }}
                            placeholder={'Выберите динамик'}
                            size={'large'}
                            onChange={(value) => setBellSpeaker(speakersList.find(device => device.deviceId === value))}
                            value={currentBellDevice?.deviceId}
                            loading={isPlayingState.device === "bell" && isPlayingState.isPlaying}
                            disabled={(isPlayingState.device === "call" && isPlayingState.isPlaying) || !speakersList.length}
                        >
                            {obj2options(speakersList, { value: 'deviceId', text: 'label' })}
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row style={{ marginTop: 10 }}>
                    <Button
                        type={'primary'}
                        block={true}
                        onClick={() => checkCurrentSpeaker("bell")}
                        loading={isPlayingState.device === "bell" && isPlayingState.isPlaying}
                        disabled={(isPlayingState.device === "call" && isPlayingState.isPlaying) || !speakersList.length}
                        icon={"step-forward"}
                    >
                        Проверить звук
						</Button>
                </Row>
            </Col>

            <Col style={{ marginTop: 10 }}>
                <Row>
                    <Divider style={{
                        fontSize: 16,
                        fontWeight: 500,
                        marginBottom: 10,
                    }}>Выберите аудиовыход для разговора</Divider>
                </Row>
                <Row>
                    <Col>
                        <Select
                            style={{ width: "100%" }}
                            placeholder={'Выберите динамик'}
                            size={'large'}
                            onChange={(value) => setCallSpeaker(speakersList.find(device => device.deviceId === value))}
                            value={currentCallDevice?.deviceId}
                            loading={isPlayingState.device === "call" && isPlayingState.isPlaying}
                            disabled={(isPlayingState.device === "bell" && isPlayingState.isPlaying) || !speakersList.length}
                        >
                            {obj2options(speakersList, { value: 'deviceId', text: 'label' })}
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row style={{ marginTop: 10 }}>
                    <Button
                        type={'primary'}
                        block={true}
                        onClick={() => checkCurrentSpeaker("call")}
                        loading={isPlayingState.device === "call" && isPlayingState.isPlaying}
                        disabled={(isPlayingState.device === "bell" && isPlayingState.isPlaying) || !speakersList.length}
                        icon={"step-forward"}
                    >
                        Проверить звук
						</Button>
                </Row>
            </Col>
            <Col style={{ marginTop: 15 }}>
                <Row>
                    <Divider style={{
                        fontSize: 16,
                        fontWeight: 500,
                        marginBottom: 10,
                    }}>Выберите микрофон</Divider>
                </Row>
                <Row>
                    <Col>
                        <Select
                            style={{ width: "100%" }}
                            placeholder={'Выберите микрофон'}
                            size={'large'}
                            onChange={(value) => setMicDevice(micsList.find(device => device.deviceId === value))}
                            value={currentMicDevice?.deviceId}
                            disabled={!micsList.length}
                        >
                            {obj2options(micsList, { value: 'deviceId', text: 'label' })}
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

SettingsDevices.propTypes = {
    currentCallDevice: PropTypes.object,
    currentBellDevice: PropTypes.object,
    fetchSpeakersList: PropTypes.func,
    setBellSpeaker: PropTypes.func,
    setCallSpeaker: PropTypes.func,
    checkCurrentSpeaker: PropTypes.func,
    isPlayingState: PropTypes.object,
    currentMicDevice: PropTypes.object,
    micsList: PropTypes.array,
    speakersList: PropTypes.array,
    setMicDevice: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        speakersList: getSpeakersList(state),
        currentCallDevice: getCurrentCallDevice(state),
        currentBellDevice: getCurrentBellDevice(state),
        isPlayingState: getIsPlayingSpeaker(state),
        micsList: getMicsList(state),
        currentMicDevice: getMicDevice(state),
    }
};

const mapDispatchToProps = {
    setCallSpeaker,
    setBellSpeaker,
    checkCurrentSpeaker,
    setMicDevice,
};

const EnhancedSettingsDevices = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SettingsDevices);

export { EnhancedSettingsDevices };