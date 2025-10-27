import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Video, Volume2, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CommunityCard } from '@/components/CommunityCard';
import { Filters } from '@/components/Filters';
import { Footer } from '@/components/Footer';
import { SortBy } from '@/components/SortBy';
import { CommunityPagination } from '@/components/CommunityPagination';
import { communities as allCommunities } from '@/data/communities';

const ITEMS_PER_PAGE = 8;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('rank');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const sortedAndFilteredCommunities = allCommunities
    .filter(community => 
      selectedCategory === 'All' || community.category === selectedCategory
    )
    .filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'members':
          return b.members - a.members;
        case 'price_asc': {
          const priceA = a.price === 'Free' ? 0 : a.price;
          const priceB = b.price === 'Free' ? 0 : b.price;
          return priceA - priceB;
        }
        case 'price_desc': {
          const priceADesc = a.price === 'Free' ? 0 : a.price;
          const priceBDesc = b.price === 'Free' ? 0 : b.price;
          return priceBDesc - priceADesc;
        }
        case 'rank':
        default:
          return a.rank - b.rank;
      }
    });

  const totalPages = Math.ceil(sortedAndFilteredCommunities.length / ITEMS_PER_PAGE);
  const paginatedCommunities = sortedAndFilteredCommunities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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

        {/* AI Media Generator Feature Card */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-blue-600" />
                AI Media Generator
              </CardTitle>
              <CardDescription>
                Transform images into videos and generate AI voices from text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <Video className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-semibold">Image to Video</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Convert images to animated videos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <Volume2 className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-semibold">Voice Generator</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Text to speech with AI voices</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Link to="/media-generator">
                    <Button size="lg" className="w-full sm:w-auto">
                      Try Now
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-lg mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for anything"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <Filters selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />

        <div className="flex justify-end mb-4">
          <SortBy value={sortOption} onChange={setSortOption} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedCommunities.map(community => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
        
        <CommunityPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;