import React, { createContext, useState, useMemo, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'

import { LevelUpModal } from '../components/LevelUpModal'

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

type ChallengesContextData = {
  level: number; 
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;  
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

type ChallengesProviderProps = {
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...props }: ChallengesProviderProps) {
  const [level, setLevel] = useState(props.level || 1)
  const [currentExperience, setCurrentExperience] = useState(props.currentExperience || 0)
  const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted || 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = useMemo(() => Math.pow((level + 1) * 4, 2), [level])
  
/*  o uso de Notification dá erro no vercel
  useEffect(() => {
    Notification.requestPermission()
  }, [])
*/

  useEffect(() => {
    Cookies.set('level', level.toString())
    Cookies.set('currentExperience', currentExperience.toString())
    Cookies.set('challengesCompleted', challengesCompleted.toString())
  }, [level, currentExperience, challengesCompleted])
  Cookies.get()

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallenge = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallenge]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

/*  o uso de Notification dá erro no vercel
    if (Notification.permission === 'granted') {  
      new Notification('Novo desafio :)', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
*/    
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience > experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        experienceToNextLevel,
        challengesCompleted, 
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge, 
        closeLevelUpModal
      }}
    >
      {children}

      {isLevelUpModalOpen ? <LevelUpModal /> : null}
      
    </ChallengesContext.Provider>
  )
}