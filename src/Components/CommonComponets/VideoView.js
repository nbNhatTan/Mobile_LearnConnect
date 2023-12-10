import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Platform, Dimensions, AppState } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
// import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { useSelector } from 'react-redux';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const VideoPlayer = (props) => {
    const { token, userLogin } = useSelector(state => state.authReducer) || {};
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { courseId, source, onComplete } = props;
    const sourceUrl = source?.contentUrl;
    const videoPlayer = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);
    const [isCompleted, setCompleted] = useState(false);

    const saveProcess = isCompleted? () => console.log("This lecture is completed")
    :
     async () => {
        await axios.post(`https://learnconnectapitest.azurewebsites.net/api/learning-process/save_process?userId=${
            userLogin.id}&lectureId=${
                source.id}&courseId=${
                    courseId}&currentTime=${
                        Math.round(currentTime)}&maxTime=${
                            Math.round(maxTime)}&totalTime=${duration}`
        ).then(res => {
            console.log('Save process success', currentTime, maxTime);
        }).catch(err => console.log('Error at saveProcess(): ', err));
    };

    const getProcess = async () => {
        await axios.get(
            `https://learnconnectapitest.azurewebsites.net/api/learning-process/get_lecture_process?lectureId=${
                source.id}&courseId=${courseId}&userId=${userLogin.id}`
          ).then((res) => {
            const learningProcess = res?.data.status;
            if (learningProcess === 1) {
                setCompleted(false);
              console.log("In Processing");
            } else {
              setCompleted(true);
              console.log("Completed");
            }
            setCurrentTime(res?.data.currentStudyTime);
            setMaxTime(res?.data.maxStudyTime);
          }).catch(err => console.log('Error at getProcess(): ', err));
    }

    const onSeek = (seek) => {
        if (seek <= maxTime) {
            videoPlayer?.current.seek(seek);
        }
    };
    const onSeeking = (currentVideoTime) => {
        if (currentVideoTime > maxTime) {
            return false;
        }
        setCurrentTime(currentVideoTime);
        return true;
    }
    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
        if(paused){
            saveProcess();
        }
    };
    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(true);
        } else {
            setPlayerState(PLAYER_STATES.PLAYING);
            setPaused(false);
        }
    };
    // useEffect(() => {
    //     setPlayerState(PLAYER_STATES.PLAYING);
    // }, [sourceUrl])

    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
            if (data.currentTime > maxTime) {
                setMaxTime(data.currentTime);
            }
            if(!isCompleted && maxTime > duration*0.9){
                setMaxTime(duration);
                saveProcess();
                onComplete();
                setCompleted(true)
                console.log("completed")
            }
        }
    };
    const onLoad = (data) => {
        setDuration(Math.round(data.duration));
        videoPlayer?.current.seek(currentTime);
        setIsLoading(false);
    };

    const onLoadStart = () => {
        if(paused){
            setPlayerState(PLAYER_STATES.PAUSED);
        }else {
            setPlayerState(PLAYER_STATES.PLAYING);
        }
        
        setIsLoading(true);
        getProcess();
    }
    const onEnd = () => {
        setPlayerState(PLAYER_STATES.ENDED);
        setMaxTime(duration);
        saveProcess();
        console.log("end")
        // setCurrentTime(duration);
    };
    const [isFullScreen, setIsFullScreen] = useState(false);
    const onFullScreen = () => {
        if (!isFullScreen) {
            Orientation.lockToLandscape();
        } else {
            if (Platform.OS === 'ios') {
                Orientation.unlockAllOrientations();
            }
            Orientation.unlockAllOrientations();
        }
        setIsFullScreen(!isFullScreen);
    };

    const appState = useRef(AppState.currentState);

    const handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            // Người dùng quay lại ứng dụng từ chế độ background hoặc inactive
            console.log('Ứng dụng đã được quay lại');
        } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
            // Người dùng rời khỏi ứng dụng hoặc chuyển sang chế độ background hoặc inactive
            console.log('Ứng dụng đã mất tập trung hoặc người dùng rời khỏi ứng dụng');
            saveProcess();
        }

        appState.current = nextAppState;
    };

    useEffect(() => {
        // Đăng ký sự kiện AppState
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            // AppState.removeEventListener('change', handleAppStateChange);
            subscription.remove();
        };
    }, []);

    return (
        <View style={{ marginHorizontal: isFullScreen ? 0 : 0 }}>
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                posterResizeMode={'cover'}
                onProgress={onProgress}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode='cover'
                source={{
                    uri: sourceUrl,
                }}
                style={styles.backgroundVideo}
            />
            <MediaControls
                isFullScreen={isFullScreen}
                duration={duration}
                isLoading={isLoading}
                progress={currentTime}
                onFullScreen={onFullScreen}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                mainColor={'red'}
                playerState={playerState}
                style={isFullScreen ? styles.backgroundVideoFullScreen : styles.backgroundVideo}
                sliderStyle={isFullScreen ? { containerStyle: styles.mediaControls, thumbStyle: {}, trackStyle: {} } : { containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        height: 200,
        width: '100%',
        backgroundColor: 'rgba(223,238,255,1)'
    },
    mediaControls: {
        width: '80%',
        height: '100%',
        flex: 1,
        alignSelf: 'center',
    },
    backgroundVideoFullScreen: {
        height: screenWidth,
        width: screenHeight * 0.5
    },
});

export default VideoPlayer;