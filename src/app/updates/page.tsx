import type { Metadata } from "next";
import UpdateCard from "@/components/updates/UpdateCard";
import { getAllUpdates } from "@/lib/updates";

export const metadata: Metadata = {
  title: "Updates",
  description: "Short notes on what we are working on right now.",
};

export default function UpdatesPage() {
  const updates = getAllUpdates();

  return (
    <main className="min-h-screen bg-cream px-6 pt-36 pb-24">
      <div className="mx-auto max-w-[44rem]">
        <header>
          <p className="mb-5 text-xs font-medium tracking-[0.2em] text-clay uppercase">
            Updates
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-tight text-ink">
            What we are <em className="text-clay">up to.</em>
          </h1>
          <p className="mt-6 text-lg leading-8 text-brown">
            Quick notes, newest first.
          </p>
        </header>

        {updates.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-clay/25 bg-paper p-8 text-lg text-brown">
            No updates yet. Add a .md file to <code>content/updates</code> to post one.
          </p>
        ) : (
          <div className="mt-14 ml-[9px] space-y-5 border-l-2 border-clay/30 pl-8 md:pl-10">
            {updates.map((u) => (
              <UpdateCard key={u.slug} update={u} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}