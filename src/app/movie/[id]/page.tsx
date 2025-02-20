import { Metadata } from 'next';
import MovieDetails from './MovieDetails';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Netflix Clone - Movie ${id}`,
    description: 'Movie details page for Netflix Clone',
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  
  return <MovieDetails movieId={id} />;
}