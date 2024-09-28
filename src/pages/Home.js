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
    const [gpPassed, setGpPassed] = useState(0);
    const [gpPlanned, setGpPlanned] = useState(0);
    const [ypPassed, setYpPassed] = useState(0);
    const [ypPlanned, setYpPlanned] = useState(0);

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
        let gpPassedSum = 0;
        let gpPlannedSum = 0;
        let ypPassedSum = 0;
        let ypPlannedSum = 0;
        courses.forEach(course => {
            // passed course
            if(course.grade>=5)
            {
                passedCount++;
                passedEcts+=course.ECTS;
                weightedSum += course.ECTS * course.grade;

                if(course.category==="ΓΠ")
                {
                    gpPassedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPassedSum++;
                }
            }
            // planed course
            if(course.hasCourse)
            {
                plannedEcts+=course.ECTS;

                if(course.category==="ΓΠ")
                {
                    gpPlannedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPlannedSum++;
                }
            }
            if(course.isActive)
            {
                currentCountSum++;
            }
        });
        setEctsPassedSum(passedEcts);
        setEctsPlannedSum(plannedEcts);
        setGpPassed(gpPassedSum);
        setGpPlanned(gpPlannedSum);
        setYpPassed(ypPassedSum);
        setYpPlanned(ypPlannedSum);
        if(passedEcts !== 0)
        {
            setCurrentGrade(weightedSum / passedEcts);
        }
    }
    return (
    <Flex align="center" justifyContent="center" flexDirection={"column"} w="100%" h="100%" mb={4}>
        <CircularProgress value={ectsPassedSum} color='blue.400'  size='250px' thickness='5px' min={0} max={240} mt={3}>
            <CircularProgressLabel>{ectsPassedSum+" "}ects</CircularProgressLabel>
        </CircularProgress>
        <Card w={"30%"}>
            <CardHeader>
                <Heading size='lg'>Your Stats</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='md' mb={5}>Passed Overview</Heading>
                    <Stat>
                        <StatLabel>Average</StatLabel>
                        <StatNumber>{currentGrade.toFixed(2)}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Passed Γενικης Παιδειας</StatLabel>
                        <StatNumber>{gpPassed}/3</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Passed Υποχρεωτικά</StatLabel>
                        <StatNumber>{ypPassed}/18</StatNumber>
                    </Stat>
                </Box>
                <Box>
                    <Heading size='md' mb={5}>Planned Overview</Heading>
                    <Stat>
                        <StatLabel>Planned ECTS</StatLabel>
                        <StatNumber>{ectsPlannedSum}/240</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Planned Γενικης Παιδειας</StatLabel>
                        <StatNumber>{gpPlanned}/3</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Planned Υποχρεωτικά</StatLabel>
                        <StatNumber>{ypPlanned}/18</StatNumber>
                    </Stat>
                </Box>
                </Stack>
            </CardBody>
        </Card>
    </Flex>)
}