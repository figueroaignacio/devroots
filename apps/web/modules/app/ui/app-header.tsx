export async function AppHeader() {
  return (
    <header className="sticky top-0 left-0 z-50 border-b backdrop-blur-md block md:hidden">
      <div className="container mx-auto py-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="ml-2 text-lg font-bold">devs.</span>
        </div>
      </div>
    </header>
  );
}
