'use client';

import { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { X, Search, Loader2 } from 'lucide-react';
import { debounce } from '@/lib/search';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearchChange: (query: string) => void;
  isLoading?: boolean;
  debounceMs?: number;
  className?: string;
}

export function SearchBar({
  placeholder = "Search by name or email...",
  onSearchChange,
  isLoading = false,
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearchChange(searchQuery);
    }, debounceMs),
    [onSearchChange, debounceMs]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onSearchChange('');
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 transition-colors focus:ring-2"
          aria-label="Search subscribers"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {isLoading && !query && (
          <Loader2 className="absolute right-3 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>
      
      {/* Optional: Show search hint */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 mt-1 text-xs text-muted-foreground pointer-events-none">
          Type to search by name, email, or status
        </div>
      )}
    </div>
  );
}
