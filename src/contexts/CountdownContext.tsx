import { useContext, useState, useEffect, useMemo } from 'react'
import { createContext } from 'react'
import { ChallengesContext } from './ChallengesContext';

type CountdownContextData = {
  minutes: number; 
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData)

const tempoInicial = 0.1 //25 minutos

let timeout: NodeJS.Timeout

export function CountdownProvider({ children }) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(tempoInicial * 60) //25 minutos
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  //const minutes = Math.floor(time / 60)
  //const seconds = time % 60
  const minutes = useMemo(() => Math.floor(time / 60), [time]);
  const seconds = useMemo(() => time % 60, [time]);

  function startCountdown() {
    setIsActive(true)       
  }

  function resetCountdown() {
    clearTimeout(timeout)    
    setIsActive(false)
    setTime(tempoInicial * 60); 
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      timeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes, 
      seconds, 
      hasFinished, 
      isActive, 
      startCountdown, 
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}
