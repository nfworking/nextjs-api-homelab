async function getData() {
  const token = process.env.PROXMOX_API_TOKEN;

  if (!token) {
    throw new Error("Missing PROXMOX_API_TOKEN environment variable");
  }

  const res = await fetch("https://ao2.fortmont.me/api2/json/nodes/", {
    headers: {
      "Authorization": token
    }
  });

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Homelab proxmox dashboard
      </h1>
      <div className="mt-6 space-y-4 text-lg text-gray-700 dark:text-gray-200">
        {data.data?.map((node: any) => (
          <div key={node.node} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Node: {node.node}
            </h2>
            <div className="mt-2 flex items-center gap-3 text-md text-gray-500 dark:text-gray-400">
              <span
                className={`h-3 w-3 rounded-full ${
                  node.status === "online"
                    ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)] animate-pulse"
                    : "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.85)]"
                }`}
              />
              <span>Status: {node.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
