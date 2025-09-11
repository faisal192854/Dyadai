import { Bell, MessageSquare, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 py-4 px-6 flex justify-between items-center border-b">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold">skool</h1>
        <ChevronDown className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <MessageSquare className="h-6 w-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Bell className="h-6 w-6" />
        </button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};