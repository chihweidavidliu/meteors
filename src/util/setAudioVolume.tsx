import { RefObject } from "react";

export const setAudioVolume = (
  audioRef: RefObject<HTMLAudioElement>,
  volume: number
) => {
  if (audioRef?.current?.volume) {
    audioRef.current.volume = volume;
  }
};
