import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LinkCard } from "./LinkCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "@/types";
import { showError, showSuccess } from "@/utils/toast";

const STORAGE_KEY = "savedLinks";

export const LinkManager = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [shorteningId, setShorteningId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem(STORAGE_KEY);
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } catch (error) {
      console.error("Failed to load links from storage", error);
      showError("Could not load your saved links.");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (error) {
      console.error("Failed to save links to storage", error);
      showError("Could not save your new link.");
    }
  }, [links]);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newTitle.trim()) {
        showError("Please provide both a URL and a title.");
        return;
    };

    try {
      new URL(newUrl);
    } catch (_) {
      showError("Please enter a valid URL.");
      return;
    }

    const newLink: Link = {
      id: crypto.randomUUID(),
      url: newUrl,
      title: newTitle,
      createdAt: Date.now(),
    };

    setLinks([newLink, ...links]);
    setNewUrl("");
    setNewTitle("");
    showSuccess("Link saved!");
  };

  const handleDeleteLink = (idToDelete: string) => {
    setLinks(links.filter((link) => link.id !== idToDelete));
    showSuccess("Link removed.");
  };

  const handleShortenLink = async (idToShorten: string) => {
    setShorteningId(idToShorten);
    const linkToShorten = links.find(link => link.id === idToShorten);
    if (!linkToShorten) return;

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(linkToShorten.url)}`);
        if (!response.ok) throw new Error("Failed to shorten link");
        
        const shortUrl = await response.text();
        
        setLinks(links.map(link => 
            link.id === idToShorten ? { ...link, shortUrl } : link
        ));
        showSuccess("Link shortened!");
    } catch (error) {
        console.error("Shortening error:", error);
        showError("Could not shorten the link.");
    } finally {
        setShorteningId(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Save a New Link</CardTitle>
            <CardDescription>Add a URL and a custom title for easy reference.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Enter a title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-white/80 dark:bg-gray-900/80"
                />
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="bg-white/80 dark:bg-gray-900/80"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                Save Link
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-12">
        <AnimatePresence>
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {links.length > 0 ? (
              links.map((link) => (
                <motion.div
                  key={link.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -50 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <LinkCard 
                      link={link} 
                      onDelete={handleDeleteLink}
                      onShorten={handleShortenLink}
                      isShortening={shorteningId === link.id}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 pt-8 col-span-full"
              >
                No links saved yet. Add one above to get started!
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};