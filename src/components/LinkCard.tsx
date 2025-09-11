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
    <Card className="h-full flex flex-col bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100">{link.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <LinkIcon className="h-4 w-4 flex-shrink-0" />
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
            <div className="flex items-center space-x-2 text-sm p-2 rounded-md bg-green-100 dark:bg-green-900/50">
              <ArrowRight className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-green-700 dark:text-green-400">{link.shortUrl}</span>
              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6" onClick={() => handleCopy(link.shortUrl!)}>
                <Copy className="h-4 w-4 text-green-600 dark:text-green-400" />
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => onShorten(link.id)} disabled={isShortening} className="border-purple-400 text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/50">
              {isShortening ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LinkIcon className="mr-2 h-4 w-4" />
              )}
              Shorten Link
            </Button>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t mt-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(link.createdAt).toLocaleDateString()}
            </p>
            <Button variant="ghost" size="icon" onClick={() => onDelete(link.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full">
                <Trash2 className="h-5 w-5" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};