'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error("App boundary caught error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-red-50 p-8 rounded-3xl border border-red-100 max-w-md w-full">
        <h2 className="text-2xl font-black text-red-600 mb-4 tracking-tight">Oops! Something went wrong</h2>
        <p className="text-slate-600 mb-8 font-medium">
          An unexpected error occurred in the application. Don&apos;t worry, our Meowth is working on it!
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md hover:shadow-lg w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
