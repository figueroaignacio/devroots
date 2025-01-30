import { getCommunityBySlug } from "@/modules/communities/services/communities-services";

export default async function CommunitiesPage({
  params,
}: {
  params: { slug: string };
}) {
  const community = await getCommunityBySlug(params.slug);

  return (
    <div>
      <h1>{community.name}</h1>
      <p>{community.description}</p>
    </div>
  );
}
