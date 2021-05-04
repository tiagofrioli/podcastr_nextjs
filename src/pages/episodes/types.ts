export interface Episode {
 id: string;
 title: string;
 thumbnail: string;
 members: string;
 duration: number;
 durationAsString: string;
 url: string;
 publishedAt: string;
 description: string;
};

export interface EpisodeProps{
 episode: Episode;
};