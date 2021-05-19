import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../context/playerContext";
import Image from 'next/image';
import styles from "./styles.module.scss";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function Player(){

 const audioRef = useRef<HTMLAudioElement>(null);

 const {currentEpisodeIndex, episodeList, isPlaying, togglePlay, setPlayingState} = useContext(PlayerContext);  

 const episode = episodeList[currentEpisodeIndex];


 useEffect(()=> {

   if(!audioRef.current){
      return;
   }

   if(isPlaying){
      audioRef.current.play();
   }else{
      audioRef.current.pause();
   }

 } 
 , [isPlaying]);

 return (
   <div className={styles.playerContainer}> 
      <header>
       <img src="/playing.svg" alt="tocando agora" />
       <strong>Tocando agora </strong>
      </header>

     {episode ?  (
     <div className={styles.currentEpisode}>
        <Image  width={592} height={592} src={episode.thumbnail} objectFit="cover" />
         <strong>{episode.title}</strong>
         <span>{episode.members}</span>
     </div> ) 
     
     :(<div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>)}
      <footer className={!episode ? styles.empty: ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
             {episode ?  <Slider 
                  trackStyle={{backgroundColor:"#04d361"}}
                  railStyle={{backgroundColor:"#9f75ff"}} 
                  handleStyle={{borderColor: "#04d361", borderWidth: 4}}
                  /> 
               : 
             <div className={styles.emptySlider} />}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
           <audio  
               ref={audioRef}
               src={episode.url}
               autoPlay
               onPlay={()=> setPlayingState(true)}
               onPause={()=> setPlayingState(false)}
           />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode} >
             <img src="/shuffle.svg" alt="Aleatório" />
          </button>
          <button type="button" disabled={!episode}>
             <img src="/play-previous.svg" alt="Anterior" />
          </button>
          <button type="button" onClick={togglePlay} disabled={!episode} className={styles.playButton}>
             {isPlaying ? 
              <img src="/pause.svg" alt="Pause" /> 
             :<img src="/play.svg" alt="Tocar" />}
          </button>
          <button type="button" disabled={!episode}>
             <img src="/play-next.svg" alt="Proximo" />
          </button>
          <button type="button" disabled={!episode}>
             <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
   </div>
 );
}