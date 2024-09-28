import { Box, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

const Header = () => {

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
        <Box bg="blue.500" color="white" py={1} px={0}>
            <Flex align="center">
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
            </Flex>
        </Box>
    );
};

export default Header;