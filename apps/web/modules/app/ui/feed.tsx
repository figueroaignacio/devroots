import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_URL } from "@/lib/constants";
import { auth } from "@/modules/auth/lib/auth";
import { format } from "date-fns";
import { getInitials } from "../lib/utils";

interface User {
  id: string;
  name: string;
  email: string | null;
  password: string | null;
  emailVerified: string;
  image: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export async function Feed() {
  const session = await auth();

  const data = await fetch(`${API_URL}/users`);
  const users: User[] = await data.json();

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <h2>Account</h2>
        <pre>
          <code className="p-2">{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
      <div>
        <h2 className="mb-5">Users registered</h2>
        <ul className="space-y-5">
          {users.map((user) => (
            <li key={user.id} className="bg-card p-4 rounded-md">
              <Avatar>
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p>
                <span className="font-medium">Verified:</span>{" "}
                {user.emailVerified
                  ? format(new Date(user.emailVerified), "PPP p")
                  : "Not verified"}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {format(new Date(user.createdAt), "PPP p")}
              </p>
              <p>
                <span className="font-medium">Updated At:</span>{" "}
                {format(new Date(user.updatedAt), "PPP p")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
