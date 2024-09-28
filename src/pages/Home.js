import { Flex } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Box,
    Heading,
    Stack,
    StackDivider,
    Text,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export function Home({courses})
{
    const [ectsPassedSum, setEctsPassedSum] = useState(0);
    const [ectsPlannedSum, setEctsPlannedSum] = useState(0);
    const [currentGrade, setCurrentGrade] = useState(0);
    const [currentCount, setCurrentCount] = useState(0);

    useEffect(()=>{
        calculateStats();
    },[courses]);

    const calculateStats = () =>
    {
        let passedCount = 0;
        let passedEcts = 0;
        let plannedEcts = 0;
        let weightedSum = 0;
        let currentCountSum = 0;
        courses.forEach(course => {
            if(course.grade>=5)
            {
                passedCount++;
                passedEcts+=course.ECTS;
                weightedSum += course.ECTS * course.grade;
            }
            if(course.hasCourse)
            {
                plannedEcts+=course.ECTS;
            }
            if(course.isActive)
            {
                currentCountSum++;
            }
        });
        setEctsPassedSum(passedEcts);
        setEctsPlannedSum(plannedEcts);
        if(passedEcts !== 0)
        {
            setCurrentGrade(weightedSum / passedEcts);
        }
        setCurrentCount(currentCountSum);
    }
    return (
    <Flex align="center" justifyContent="center" flexDirection={"column"} w="100%" h="100%">
        <Text fontSize={"3xl"} m={2}>Progress</Text>
        <CircularProgress value={ectsPassedSum} color='blue.400'  size='250px' thickness='5px' min={0} max={240}>
            <CircularProgressLabel>{ectsPassedSum+" "}ects</CircularProgressLabel>
        </CircularProgress>
        <Card>
            <CardHeader>
                <Heading size='md'>Overview</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Stat>
                        <StatLabel>Average</StatLabel>
                        <StatNumber>{currentGrade.toFixed(2)}</StatNumber>
                        <StatHelpText>Your grade in {" "}
                            <ChakraLink as={ReactRouterLink} to='/dit-planner/passed' color='blue.500'>
                                passed courses
                            </ChakraLink>
                        </StatHelpText>
                    </Stat>
                </Box>
                <Box>
                    <Stat>
                        <StatLabel>Current Classes</StatLabel>
                        <StatNumber>{currentCount}</StatNumber>
                        <StatHelpText>Number of{" "}
                            <ChakraLink as={ReactRouterLink} to='/dit-planner/current' color='blue.500'>
                                current courses
                            </ChakraLink>
                            {" "}you are currently attending.
                        </StatHelpText>
                    </Stat>
                </Box>
                <Box>
                    <Stat>
                        <StatLabel>Planned ECTS</StatLabel>
                        <StatNumber>{ectsPlannedSum}/240</StatNumber>
                        <StatHelpText>Your planned sum of ECTS
                            in{" "}
                            <ChakraLink as={ReactRouterLink} to='/dit-planner/passed' color='blue.500'>
                                passed courses
                            </ChakraLink>
                            {" "}and{" "}
                            <ChakraLink as={ReactRouterLink} to='/dit-planner/planned' color='blue.500'>
                                planned courses.
                            </ChakraLink>                            
                            {" "}Not enough? Check{" "}
                            <ChakraLink as={ReactRouterLink} to='/dit-planner/all' color='blue.500'>
                                all the courses
                            </ChakraLink>     
                        </StatHelpText>
                    </Stat>
                </Box>
                </Stack>
            </CardBody>
        </Card>
    </Flex>)
}