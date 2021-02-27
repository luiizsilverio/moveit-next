import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

import styles from '../styles/Home.module.css';

type HomeProps = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >        
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div> 
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

// Camadas da aplicação:
// 1- Back-end (Node)
// 2- Next.js (Node)
// 3- Front-end (React)

/*
 Quando eu declaro a função getServerSideProps dentro de uma
 página do Next, eu consigo manipular quais dados são repassados
 da campada do Next para a camada Front-end. (ctx = context)
 Antes da interface ser montada em tela, pode chamar uma API
 ou cookies, e repassar os dados para o front-end antes de
 montar a tela.
*/
