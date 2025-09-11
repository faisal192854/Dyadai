import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Link as LinkIcon } from "lucide-react";

interface LinkCardProps {
  link: string;
  onDelete: (link: string) => void;
}

export const LinkCard = ({ link, onDelete }: LinkCardProps) => {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <LinkIcon className="h-5 w-5 text-gray-500" />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
          >
            {link}
          </a>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onDelete(link)}>
          <Trash2 className="h-5 w-5 text-red-500" />
        </Button>
      </CardContent>
    </Card>
  );
};