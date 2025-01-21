/* eslint-disable @next/next/no-img-element */
import { API_URL } from "@/lib/constants";
import { auth } from "@/modules/auth/lib/auth";
import { format } from "date-fns";

interface User {
  id: string;
  name: string;
  email: string;
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
        <pre className="space-y-6">{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div>
        <h2 className="mb-5">Users registered</h2>
        <ul className="space-y-5">
          {users.map((user) => (
            <li key={user.id} className="bg-card p-4 rounded-md">
              {user.image ? (
                <img
                  src={user.image || "https://via.placeholder.com/56"}
                  alt={`${user.name}'s avatar`}
                  className="size-7 rounded-full"
                />
              ) : (
                <p>No image provided</p>
              )}
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p>
                <span className="font-medium">Verified:</span>{" "}
                {user.emailVerified
                  ? format(new Date(user.emailVerified), "PPPpp")
                  : "Not verified"}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{" "}
                {format(new Date(user.createdAt), "PPPpp")}
              </p>
              <p>
                <span className="font-medium">Updated At:</span>{" "}
                {format(new Date(user.updatedAt), "PPPpp")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
