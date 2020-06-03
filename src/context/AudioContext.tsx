import React, { FunctionComponent, useState, createRef } from "react";
import { createContext, useContext } from "react";
import { setAudioVolume } from "../util/setAudioVolume";
const levelUpSound = require("../assets/levelUp.mp3");
const laserSound = require("../assets/laser.mp3");
const errorSound = require("../assets/error.mp3");
const exposionSound = require("../assets/explosion.mp3");

enum SoundEffect {
  LEVEL_UP = "LEVEL_UP",
  ERROR = "ERROR",
  LASER = "LASER",
  EXPLOSION = "EXPLOSION",
}

interface IAudioContextProps {
  playAudio: (sound: SoundEffect) => void;
}

const initialprops: IAudioContextProps = {
  playAudio: () => {},
};

const AudioContext = createContext(initialprops);

const useAudioContext = () => useContext(AudioContext);

const AudioProvider: FunctionComponent = ({ children }) => {
  const [levelUpAudioRef] = useState(createRef<HTMLAudioElement>());
  const [errorAudioRef] = useState(createRef<HTMLAudioElement>());
  const [laserAudioRef] = useState(createRef<HTMLAudioElement>());
  const [explosionAudioRef] = useState(createRef<HTMLAudioElement>());

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
      <AudioContext.Provider value={{ playAudio }}>
        {children}
      </AudioContext.Provider>
    </>
  );
};

export { AudioContext, useAudioContext, AudioProvider, SoundEffect };
