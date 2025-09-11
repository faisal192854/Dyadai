import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Link as LinkIcon,
  Copy,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "@/types";
import { showSuccess } from "@/utils/toast";

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
  onShorten: (id:string) => void;
  isShortening: boolean;
}

export const LinkCard = ({ link, onDelete, onShorten, isShortening }: LinkCardProps) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccess("Copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{link.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <LinkIcon className="h-4 w-4" />
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate"
          >
            {link.url}
          </a>
        </div>

        {link.shortUrl ? (
          <div className="flex items-center space-x-2 text-sm">
            <ArrowRight className="h-4 w-4 text-green-500" />
            <span className="font-semibold text-green-600">{link.shortUrl}</span>
            <Button variant="ghost" size="icon" onClick={() => handleCopy(link.shortUrl!)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => onShorten(link.id)} disabled={isShortening}>
            {isShortening ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LinkIcon className="mr-2 h-4 w-4" />
            )}
            Shorten Link
          </Button>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t">
            <p className="text-xs text-gray-400">
                Saved on: {new Date(link.createdAt).toLocaleDateString()}
            </p>
            <Button variant="ghost" size="icon" onClick={() => onDelete(link.id)}>
                <Trash2 className="h-5 w-5 text-red-500" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};