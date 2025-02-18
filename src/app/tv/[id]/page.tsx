import TVShowDetailsComponent from './TVShowDetails';

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export default async function TVShowPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  return <TVShowDetailsComponent showId={resolvedParams.id} />;
}