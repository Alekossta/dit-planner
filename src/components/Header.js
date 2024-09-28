import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

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
        <Box bg="blue.500" p={4} color="white">
            <Flex align="center">
                <ChakraLink as={ReactRouterLink} to='/'  style={linkStyle("/")}>
                    Home
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/current'  style={linkStyle("/current")}>
                    Current Courses
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/passed'  style={linkStyle("/passed")}>
                    Passed Courses
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/planned'  style={linkStyle("/planned")}>
                    Planned Courses
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/all'  style={linkStyle("/all")}>
                    All Courses
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to='/settings'  style={linkStyle("/settings")}>
                    Settings
                </ChakraLink>
            </Flex>
        </Box>
    );
};

export default Header;