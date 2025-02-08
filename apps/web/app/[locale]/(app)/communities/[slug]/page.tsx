import { CommunityView } from "@/modules/communities/ui/community-view";

export default function CommunitiesPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CommunityView slug={params.slug} />;
}
