import { getAllCommunities } from "@/modules/communities/services/communities-services";

export default async function CommunitiesPage() {
  const communities = await getAllCommunities();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {communities.map((community) => (
        <div key={community.id} className="rounded-lg overflow-hidden border">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-gray-900">
                {community.name}
              </h2>
            </div>
            <p className="text-gray-700 text-sm mt-2">
              {community.description}
            </p>
            <div className="mt-4">
              <a
                href={`/communities/${community.slug}`}
                className="inline-block text-violet-700 underline font-semibold"
              >
                Ver comunidad
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
