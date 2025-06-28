export function FunnyCodeSnippet() {
  return (
    <div className="hidden lg:block">
      <div className="max-w-md rounded-lg bg-slate-800 p-4 text-sm text-green-400">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div>
          <span className="text-blue-400">$</span> git commit -m "fixed
          everything"
          <br />
          <span className="text-blue-400">$</span> git push --force origin main
          <br />
          <span className="text-gray-400"># idk what i am doing 👾</span>
        </div>
      </div>
    </div>
  );
}
