import React, { useState } from 'react';
import {
  Flex,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

export function SearchBar({searchQuery, setSearchQuery}) {
  const toast = useToast();

  return (
    <Flex justifyContent={'flex-start'} gap={1} alignItems={'center'} style={{flexGrow: '1'}}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          variant="outline"
          size="md"
        />
        <Button colorScheme='teal' style={{backgroundColor: "#4299e1", borderRadius: '10%'}} >
          Search
        </Button>
    </Flex>
    
  );
};

