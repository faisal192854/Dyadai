import { Button } from '@/components/ui/button';
import { BookOpen, Music, DollarSign, Sparkles, Cpu, HeartPulse, Dumbbell, Brain, Heart } from 'lucide-react';

const categories = [
  { name: 'All', icon: null },
  { name: 'Hobbies', icon: BookOpen },
  { name: 'Music', icon: Music },
  { name: 'Money', icon: DollarSign },
  { name: 'Spirituality', icon: Sparkles },
  { name: 'Tech', icon: Cpu },
  { name: 'Health', icon: HeartPulse },
  { name: 'Sports', icon: Dumbbell },
  { name: 'Self-improvement', icon: Brain },
  { name: 'Relationships', icon: Heart },
];

interface FiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const Filters = ({ selectedCategory, onSelectCategory }: FiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map(({ name, icon: Icon }) => (
        <Button
          key={name}
          variant={selectedCategory === name ? 'default' : 'outline'}
          onClick={() => onSelectCategory(name)}
          className="rounded-full"
        >
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {name}
        </Button>
      ))}
    </div>
  );
};