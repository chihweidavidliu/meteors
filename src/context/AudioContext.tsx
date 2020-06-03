import React, {
  Dispatch,
  SetStateAction,
  FunctionComponent,
  useState,
  createRef,
  useEffect,
} from "react";
import { createContext, useContext } from "react";
import { setAudioVolume } from "../util/setAudioVolume";
const levelUpSound = require("../assets/levelUp.mp3");
const laserSound = require("../assets/laser.mp3");
const errorSound = require("../assets/error.mp3");
const exposionSound = require("../assets/explosion.mp3");
const bacgroundMusic = require("../assets/background.mp3");

enum SoundEffect {
  LEVEL_UP = "LEVEL_UP",
  ERROR = "ERROR",
  LASER = "LASER",
  EXPLOSION = "EXPLOSION",
  BACKGROUND = "BACKGROUND",
}

interface IAudioContextProps {
  playAudio: (sound: SoundEffect) => void;
  isBackgroundMusicDisabled: boolean;
  setIsBackgroundMusicDisabled: Dispatch<SetStateAction<boolean>>;
}

const initialprops: IAudioContextProps = {
  playAudio: () => {},
  isBackgroundMusicDisabled: false,
  setIsBackgroundMusicDisabled: () => {},
};

const AudioContext = createContext(initialprops);

const useAudioContext = () => useContext(AudioContext);

const AudioProvider: FunctionComponent = ({ children }) => {
  const [isBackgroundMusicDisabled, setIsBackgroundMusicDisabled] = useState(
    true
  );

  const [levelUpAudioRef] = useState(createRef<HTMLAudioElement>());
  const [errorAudioRef] = useState(createRef<HTMLAudioElement>());
  const [laserAudioRef] = useState(createRef<HTMLAudioElement>());
  const [explosionAudioRef] = useState(createRef<HTMLAudioElement>());
  const [backgroundAudioRef] = useState(createRef<HTMLAudioElement>());

  useEffect(() => {
    if (isBackgroundMusicDisabled) {
      backgroundAudioRef?.current?.pause();
      if (backgroundAudioRef?.current) {
        backgroundAudioRef.current.currentTime = 0;
      }
    }
  }, [backgroundAudioRef, isBackgroundMusicDisabled]);

  const playAudio = (sound: SoundEffect) => {
    switch (sound) {
      case SoundEffect.LEVEL_UP:
        setAudioVolume(levelUpAudioRef, 0.4);
        return levelUpAudioRef?.current?.play();
      case SoundEffect.ERROR:
        setAudioVolume(errorAudioRef, 0.4);
        return errorAudioRef?.current?.play();
      case SoundEffect.LASER:
        setAudioVolume(laserAudioRef, 0.4);
        return laserAudioRef?.current?.play();
      case SoundEffect.EXPLOSION:
        setAudioVolume(explosionAudioRef, 0.4);
        return explosionAudioRef?.current?.play();
      case SoundEffect.BACKGROUND:
        setAudioVolume(backgroundAudioRef, 0.2);
        return backgroundAudioRef?.current?.play();
      default:
        break;
    }
  };

  return (
    <>
      <audio src={levelUpSound} ref={levelUpAudioRef}></audio>
      <audio src={laserSound} ref={laserAudioRef}></audio>
      <audio src={errorSound} ref={errorAudioRef}></audio>
      <audio src={exposionSound} ref={explosionAudioRef}></audio>
      <audio src={bacgroundMusic} ref={backgroundAudioRef} loop></audio>
      <AudioContext.Provider
        value={{
          playAudio,
          isBackgroundMusicDisabled,
          setIsBackgroundMusicDisabled,
        }}
      >
        {children}
      </AudioContext.Provider>
    </>
  );
};

export { AudioContext, useAudioContext, AudioProvider, SoundEffect };
