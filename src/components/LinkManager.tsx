import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LinkCard } from "./LinkCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const LinkManager = () => {
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.trim() && !links.includes(newLink)) {
      // A simple check to see if the link is valid-ish
      try {
        new URL(newLink);
        setLinks([newLink, ...links]);
        setNewLink("");
      } catch (_) {
        // You can add a toast notification here for invalid URLs
        console.error("Invalid URL");
      }
    }
  };

  const handleDeleteLink = (linkToDelete: string) => {
    setLinks(links.filter((link) => link !== linkToDelete));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Save a Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddLink} className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://example.com"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Save</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-4">
        {links.length > 0 ? (
          links.map((link) => (
            <LinkCard key={link} link={link} onDelete={handleDeleteLink} />
          ))
        ) : (
          <p className="text-center text-gray-500">No links saved yet.</p>
        )}
      </div>
    </div>
  );
};