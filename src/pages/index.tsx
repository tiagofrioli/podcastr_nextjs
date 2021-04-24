import React, { useEffect } from "react";


export default function Home(props) {

  /* ---------------------------------
      SPA
  
  useEffect(()=>{

    fetch('http://localhost:3333/episodes').then(response => response.json()
    .then(data => console.log(data)));

  }, []);
 ----------------------------------------*/

 
  return (
      <h1>Hello</h1>
  )
}

/* SSG */
export async function getStaticProps(){
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json();

  return{
    props:{
      episodes: data
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
