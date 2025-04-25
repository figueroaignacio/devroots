import { BackButton } from "@/components/back-button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
}
