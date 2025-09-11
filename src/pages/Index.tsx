import { LinkManager } from "@/components/LinkManager";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Link Saver
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Your personal space to save and organize important links.
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