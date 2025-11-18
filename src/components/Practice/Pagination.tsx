import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const PaginationPractice = ({
  currentPage,
  handlePageChange,
  totalExams,
  limit,
}: {
  currentPage: number;
  handlePageChange: (page: number) => void;
  totalExams: number;
  limit: number;
}) => {
  const totalPages = Math.ceil(totalExams / limit);

  //    The Solutions for pagination:
  //Option A: Client-side pagination (AI choice):

  // Fetch ALL matching records once (10,000 limit)
  // Store all in state
  // Slice client-side for each page
  // Pro: No re-fetching when changing pages
  // Con: Slow if thousands of records

  //Option B: Server-side pagination (my choice):

  // Fetch only 9 items per page
  // Re-fetch when page changes
  // Don't slice client-side
  // Pro: Faster with large datasets
  // Con: More API calls

  // Show max 7 page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, -1, totalPages]; // -1 = ellipsis
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        -1,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      -1,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      -1,
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex max-w-6xl mx-auto justify-center mt-4 mb-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((page, idx) => (
            <PaginationItem key={idx}>
              {page === -1 ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPractice;
