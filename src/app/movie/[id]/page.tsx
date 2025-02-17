import { Metadata } from 'next';
import MovieDetails from './MovieDetails';

type Props = {
  params: Promise<{ id: string }> | { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Netflix Clone - Movie ${resolvedParams.id}`,
    description: 'Movie details page for Netflix Clone',
  };
}

export default async function MoviePage({ params }: Props) {
  const resolvedParams = await params;
  return <MovieDetails movieId={resolvedParams.id} />;
}