// Components
import { Link } from "@/config/i18n/routing";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

// Utils
import { getInitials } from "../lib/utils";
import { getUsers } from "../services/users-service";

export async function UsersList() {
  const users = await getUsers();

  return (
    <ul className="border p-6 rounded-md space-y-3">
      {users.map((user) => (
        <li key={user.id} className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Link href={`/profile/${user.id}`} className="hover:underline">
              {user.name}
            </Link>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
