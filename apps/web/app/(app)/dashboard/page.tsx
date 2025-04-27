"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-between p-24 min-h-full">
      <h1>Hello {user.firstName}</h1>
      {user ? (
        <pre className="border max-w-3xl p-4 overflow-x-auto rounded-md">
          <code className="">{JSON.stringify(user, null, 2)}</code>
        </pre>
      ) : (
        <p>No user data available</p>
      )}
    </main>
  );
}
