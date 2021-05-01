import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import {format, parseISO } from 'date-fns'
import { HomeProps } from "./types";
import {api} from  '../services/api';
import { ptBR } from "date-fns/locale";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

export default function Home(props: HomeProps) {

  /* ---------------------------------
      SPA
  
  useEffect(()=>{

    fetch('http://localhost:3333/episodes').then(response => response.json()
    .then(data => console.log(data)));

  }, []);
 ----------------------------------------*/
  console.log(props.episodes);
 
  return (
      <div>
        <h1>Index</h1>
        <p>{JSON.stringify(props.episodes)}</p>
      </div>
  )
}

/* SSG */
export const getStaticProps: GetStaticProps = async () => {
  const { data }= await api.get('episodes', {
      params: {
        _limit: 12,
        _sort: 'published_at',
        _order: 'desc'
      }
  })

  const episodes = data.map(episode => {
      return {
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
        duration: Number(episode.file.duration),
        description: episode.description,
        url: episode.file.url,
        durationAsString: convertDurationToTimeString(Number(episode.file.duration))
      }
  })
 
 
  return{

    props:{
      episodes: episodes
    },
    revalidate: 60 * 60 * 8,
  }
}

/* ----------------------------------------

    SSR

export async function getServerSideProps(){
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json();

  return{
    props:{
      episodes: data
    }
  }
}

------------------------------------------*/
