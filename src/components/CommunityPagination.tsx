import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface CommunityPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CommunityPagination = ({ currentPage, totalPages, onPageChange }: CommunityPaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePrevious(); }} />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handleNext(); }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};