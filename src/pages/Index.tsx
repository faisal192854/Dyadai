import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { CommunityCard } from '@/components/CommunityCard';
import { Filters } from '@/components/Filters';
import { Footer } from '@/components/Footer';
import { communities as allCommunities } from '@/data/communities';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCommunities = allCommunities
    .filter(community => 
      selectedCategory === 'All' || community.category === selectedCategory
    )
    .filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight">Discover communities</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            or <a href="#" className="text-blue-600 hover:underline">create your own</a>
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for anything"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Filters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
        
        {/* A pagination component could be added here in the future */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;