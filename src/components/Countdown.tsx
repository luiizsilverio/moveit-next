import { useContext } from 'react'
import styles from '../styles/Countdown.module.css'
import { CountdownContext } from '../contexts/CountdownContext'

export function Countdown() {
  const { 
    minutes,
    seconds,
    hasFinished,
    isActive, 
    startCountdown, 
    resetCountdown 
  } = useContext(CountdownContext)
   
  const [minLeft, minRight] = String(minutes).padStart(2,'0').split('')
  const [secLeft, secRight] = String(seconds).padStart(2,'0').split('')
  
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minLeft}</span>
          <span>{minRight}</span>      
        </div>
        <span>:</span>
        <div>
          <span>{secLeft}</span>
          <span>{secRight}</span>  
        </div>
      </div>    

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}          
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          ) }
        </>
      )
    }

    </div>
  )  
}
