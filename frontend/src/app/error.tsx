'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#102b46] to-[#1a3f5c]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
        <p className="text-xl text-gray-300 mb-8">Something went wrong</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#f97316] text-white rounded-lg hover:bg-orange-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
