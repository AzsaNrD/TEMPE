'use client';

import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from './button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function PaginationBar({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant='ghost'
            size='icon'
            aria-label='previous'
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <Button
              variant={`${currentPage === index + 1 ? 'outline' : 'ghost'}`}
              size='icon'
              aria-label={`page-${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant='ghost'
            size='icon'
            aria-label='next'
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
