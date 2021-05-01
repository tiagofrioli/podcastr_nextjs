export interface HomeProps{
 episodes: Episode[];
}

export interface Episode{
      id: string;
      title: string;
      members: string;
      thumbnail: string;
      published_at: string;
      description: string;
      duration: number;
      url: string;
}
