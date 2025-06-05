"use client";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-white text-xl animate-pulse">
        Loading 3D Experience...
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative">
      <ThreeScene />

      {/* Instructions overlay */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-center">
          <p className="text-white text-sm">
            🖱️ Click on the rotating shape to change it and hear sounds
          </p>
        </div>
      </div>
    </main>
  );
}
