import { Community } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityCardProps {
  community: Community;
}

const formatMembers = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

export const CommunityCard = ({ community }: CommunityCardProps) => {
  const priceDisplay = community.price === 'Free' ? 'Free' : `$${community.price}/month`;

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      <div className="relative">
        <img src={community.imageUrl} alt={community.name} className="w-full h-32 object-cover" />
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
          #{community.rank}
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 border-2 border-white -mt-8 flex-shrink-0">
            <AvatarImage src={community.iconUrl} alt={`${community.name} icon`} />
            <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-md pt-1">{community.name}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 h-10 overflow-hidden flex-grow">
          {community.description}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-300 mt-3 pt-3 border-t">
          <span>{formatMembers(community.members)} Members</span>
          <span className="mx-1">•</span>
          <span>{priceDisplay}</span>
        </div>
      </CardContent>
    </Card>
  );
};