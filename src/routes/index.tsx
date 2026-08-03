import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Online Game Starter" },
      {
        name: "description",
        content:
          "Minimal starter with a live database and realtime sync, ready for building online multiplayer games.",
      },
      { property: "og:title", content: "Online Game Starter" },
      {
        property: "og:description",
        content:
          "Minimal starter with a live database and realtime sync, ready for building online multiplayer games.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <main className="min-h-screen bg-background" />;
}
