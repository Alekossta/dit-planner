import React from 'react';
import {
  Flex,
  Input,
} from '@chakra-ui/react';

export function SearchBar({searchQuery, setSearchQuery}) {
  return (
    <Flex justifyContent={'flex-start'} gap={1} alignItems={'center'} style={{flexGrow: '1'}}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          variant="outline"
          size="md"
        />
    </Flex>
    
  );
};

