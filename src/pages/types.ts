export interface HomeProps{
 latesEpisodes: Episode[];
 allEpisodes: Episode[];
}

export interface Episode{
      id: string;
      title: string;
      members: string;
      thumbnail: string;
      published_at: string;
      description: string;
      duration: number;
      durationAsString: string;
      url: string;
      publishedAt: string;
}
