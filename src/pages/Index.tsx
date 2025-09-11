import { LinkManager } from "@/components/LinkManager";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-slate-800 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Link Saver
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Your personal space to save, shorten, and organize important links.
          </p>
        </header>
        <main>
          <LinkManager />
        </main>
      </div>
      <div className="absolute bottom-4 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;