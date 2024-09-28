import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    Stack,
    Link,
    Button,
  } from '@chakra-ui/react';
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {useColorModeValue, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
  
  function BurgerHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const location = useLocation();
    const activeColor = useColorModeValue("blue.300", "blue.500"); // Adjust based on color mode


    const linkStyle = (path) => ({
    padding: "8px 16px",
    borderRadius: "md",
    fontWeight: location.pathname === path ? "bold" : "normal",
    backgroundColor: location.pathname === path ? activeColor : "transparent",
    color: location.pathname === path ? "white" : "gray.200",
    transition: "background-color 0.3s",
    });
  
    return (
      <Box bg="blue.500" color="white" py={1} px={3}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box fontWeight="bold" color="white">Logo</Box>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
  
          {/* Links (shown on desktop) */}
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                <ChakraLink as={ReactRouterLink} to='/dit-planner'  style={linkStyle("/dit-planner")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Home</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/current'  style={linkStyle("/dit-planner/current")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Current Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/passed'  style={linkStyle("/dit-planner/passed")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Passed Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/planned'  style={linkStyle("/dit-planner/planned")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Planned Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/all'  style={linkStyle("/dit-planner/all")}>
                    <Text fontSize={['xs', 'xs', 'lg']} px={0}>All Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/settings'  style={linkStyle("/dit-planner/settings")}>
                    <Text fontSize={['xs', 'xs', 'lg']}  px={0}>Settings</Text>
                </ChakraLink>
          </HStack>
        </Flex>
  
        {/* Hamburger menu items (shown on mobile) */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
            <ChakraLink as={ReactRouterLink} to='/dit-planner'  style={linkStyle("/dit-planner")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Home</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/current'  style={linkStyle("/dit-planner/current")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Current Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/passed'  style={linkStyle("/dit-planner/passed")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Passed Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/planned'  style={linkStyle("/dit-planner/planned")}>
                    <Text fontSize={['xs', 'xs', 'lg']}   px={0}>Planned Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/all'  style={linkStyle("/dit-planner/all")}>
                    <Text fontSize={['xs', 'xs', 'lg']} px={0}>All Courses</Text>
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/dit-planner/settings'  style={linkStyle("/dit-planner/settings")}>
                    <Text fontSize={['xs', 'xs', 'lg']}  px={0}>Settings</Text>
                </ChakraLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    );
  }
  
  export default BurgerHeader;