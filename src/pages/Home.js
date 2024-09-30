import { Flex } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    Box,
    Heading,
    Stack,
    StackDivider,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { Thead, Tr, Table, Td, Tbody} from "@chakra-ui/react";


export function Home({courses})
{
    const [ectsPassedSum, setEctsPassedSum] = useState(0);
    const [ectsPlannedSum, setEctsPlannedSum] = useState(0);

    const [currentGrade, setCurrentGrade] = useState(0);

    const [gpPassed, setGpPassed] = useState(0);
    const [gpPlanned, setGpPlanned] = useState(0);

    const [ypPassed, setYpPassed] = useState(0);
    const [ypPlanned, setYpPlanned] = useState(0);
    
    //
    // Could be done with array and more efficiently. Just doing this for now
    //

    const [s1BPassed, setS1BPassed] = useState(0);
    const [s1BPlanned, setS1BPlanned] = useState(0);
    const [s1YPassed, setS1YPassed] = useState(0);
    const [s1YPlanned, setS1YPlanned] = useState(0);

    const [s2BPassed, setS2BPassed] = useState(0);
    const [s2BPlanned, setS2BPlanned] = useState(0);
    const [s2YPassed, setS2YPassed] = useState(0);
    const [s2YPlanned, setS2YPlanned] = useState(0);

    const [s3BPassed, setS3BPassed] = useState(0);
    const [s3BPlanned, setS3BPlanned] = useState(0);
    const [s3YPassed, setS3YPassed] = useState(0);
    const [s3YPlanned, setS3YPlanned] = useState(0);

    const [s4BPassed, setS4BPassed] = useState(0);
    const [s4BPlanned, setS4BPlanned] = useState(0);
    const [s4YPassed, setS4YPassed] = useState(0);
    const [s4YPlanned, setS4YPlanned] = useState(0);

    const [s5BPassed, setS5BPassed] = useState(0);
    const [s5BPlanned, setS5BPlanned] = useState(0);
    const [s5YPassed, setS5YPassed] = useState(0);
    const [s5YPlanned, setS5YPlanned] = useState(0);

    const [s6BPassed, setS6BPassed] = useState(0);
    const [s6BPlanned, setS6BPlanned] = useState(0);
    const [s6YPassed, setS6YPassed] = useState(0);
    const [s6YPlanned, setS6YPlanned] = useState(0);

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
        let s1BPassedSum=0;
        let s1BPlannedSum=0;
        let s1YPassedSum=0;
        let s1YPlannedSum=0;
    
        let s2BPassedSum=0;
        let s2BPlannedSum=0;
        let s2YPassedSum=0;
        let s2YPlannedSum=0;
    
        let s3BPassedSum=0;
        let s3BPlannedSum=0;
        let s3YPassedSum=0;
        let s3YPlannedSum=0;
    
        let s4BPassedSum=0;
        let s4BPlannedSum=0;
        let s4YPassedSum=0;
        let s4YPlannedSum=0;
    
        let s5BPassedSum=0;
        let s5BPlannedSum=0;
        let s5YPassedSum=0;
        let s5YPlannedSum=0;
    
        let s6BPassedSum=0;
        let s6BPlannedSum=0;
        let s6YPassedSum=0;
        let s6YPlannedSum=0;

        courses.forEach(course => {

            // passed course
            if(course.grade>=5)
            {
                passedCount++;
                passedEcts+=parseInt(course.ECTS);
                weightedSum += parseInt(course.ECTS) * course.grade;

                if(course.category==="ΓΠ")
                {
                    gpPassedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPassedSum++;
                }

                if(course.s1)
                {
                    if(course.s1==="Υ")
                    {
                        s1YPassedSum++;
                    }

                    if(course.s1==="B")
                    {
                        s1BPassedSum++;
                    }
                }

                if(course.s2)
                {
                    if(course.s2==="Υ")
                    {
                        s2YPassedSum++;
                    }

                    if(course.s2==="B")
                    {
                        s2BPassedSum++;
                    }
                }

                if(course.s3)
                {
                    if(course.s3==="Υ")
                    {
                        s3YPassedSum++;
                    }

                    if(course.s3==="B")
                    {
                        s3BPassedSum++;
                    }
                }

                if(course.s4)
                {
                    if(course.s4==="Υ")
                    {
                        s4YPassedSum++;
                    }

                    if(course.s4==="B")
                    {
                        s4BPassedSum++;
                    }
                }


                if(course.s5)
                {
                    if(course.s5==="Υ")
                    {
                        s5YPassedSum++;
                    }

                    if(course.s5==="B")
                    {
                        s5BPassedSum++;
                    }
                }

                if(course.s6)
                {
                    if(course.s6==="Υ")
                    {
                        s6YPassedSum++;
                    }

                    if(course.s6==="B")
                    {
                        s6BPassedSum++;
                    }
                }
            }
            // planed course
            if(course.hasCourse)
            {
                plannedEcts+=parseInt(course.ECTS);

                if(course.category==="ΓΠ")
                {
                    gpPlannedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPlannedSum++;
                }

                if(course.s1)
                {
                    if(course.s1==="Υ")
                    {
                        s1YPlannedSum++;
                    }

                    if(course.s1==="B")
                    {
                        s1BPlannedSum++;
                    }
                }
    
                    if(course.s2)
                    {
                        if(course.s2==="Υ")
                        {
                            s2YPlannedSum++;
                        }
    
                        if(course.s2==="B")
                        {
                            s2BPlannedSum++;
                        }
                    }
    
                    if(course.s3)
                    {
                        if(course.s3==="Υ")
                        {
                            s3YPlannedSum++;
                        }
    
                        if(course.s3==="B")
                        {
                            s3BPlannedSum++;
                        }
                    }
    
                    if(course.s4)
                    {
                        if(course.s4==="Υ")
                        {
                            s4YPlannedSum++;
                        }
    
                        if(course.s4==="B")
                        {
                            s4BPlannedSum++;
                        }
                    }
    
    
                    if(course.s5)
                    {
                        if(course.s5==="Υ")
                        {
                            s5YPlannedSum++;
                        }
    
                        if(course.s5==="B")
                        {
                            s5BPlannedSum++;
                        }
                    }
    
                    if(course.s6)
                    {
                        if(course.s6==="Υ")
                        {
                            s6YPlannedSum++;
                        }
    
                        if(course.s6==="B")
                        {
                            s6BPlannedSum++;
                        }
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

        setS1YPassed(s1YPassedSum);
        setS1BPassed(s1BPassedSum);

        setS2YPassed(s2YPassedSum);
        setS2BPassed(s2BPassedSum);

        setS3YPassed(s3YPassedSum);
        setS3BPassed(s3BPassedSum);

        setS4YPassed(s4YPassedSum);
        setS4BPassed(s4BPassedSum);

        setS5YPassed(s5YPassedSum);
        setS5BPassed(s5BPassedSum);

        setS6YPassed(s6YPassedSum);
        setS6BPassed(s6BPassedSum);

        setS1YPlanned(s1YPlannedSum);
        setS1BPlanned(s1BPlannedSum);

        setS2YPlanned(s2YPlannedSum);
        setS2BPlanned(s2BPlannedSum);

        setS3YPlanned(s3YPlannedSum);
        setS3BPlanned(s3BPlannedSum);

        setS4YPlanned(s4YPlannedSum);
        setS4BPlanned(s4BPlannedSum);

        setS5YPlanned(s5YPlannedSum);
        setS5BPlanned(s5BPlannedSum);

        setS6YPlanned(s6YPlannedSum);
        setS6BPlanned(s6BPlannedSum);

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
        <Box w={['100%', '75%', '35%']}>
            <Card w={"100%"}>
                <CardHeader>
                    <Heading sizes='lg'>Your Stats</Heading>
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
                        <Table>
                            <Thead>
                                <Tr>
                                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                        Category
                                    </Td>
                                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                        Υποχρεωτικά
                                    </Td>
                                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                        Bασικά
                                    </Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr bg={(s1YPassed >= 2 && s1BPassed >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S1
                                    </Td>
                                    <Td>
                                        {s1YPassed}/2
                                    </Td>
                                    <Td>
                                        {s1BPassed}/4
                                    </Td>
                                </Tr>
                                <Tr bg={(s2YPassed >= 2 && s2BPassed >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S2
                                    </Td>
                                    <Td>
                                        {s2YPassed}/2
                                    </Td>
                                    <Td>
                                        {s2BPassed}/4
                                    </Td>
                                </Tr>
                                <Tr bg={(s3YPassed >= 2 && s3BPassed >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S3
                                    </Td>
                                    <Td>
                                        {s3YPassed}/2
                                    </Td>
                                    <Td>
                                        {s3BPassed}/4
                                    </Td>
                                </Tr>
                                <Tr bg={(s4YPassed >= 2 && s4BPassed >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S4
                                    </Td>
                                    <Td>
                                        {s4YPassed}/2
                                    </Td>
                                    <Td>
                                        {s4BPassed}/4
                                    </Td>
                                </Tr>
                                <Tr bg={(s5YPassed >= 2 && s5BPassed >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S5
                                    </Td>
                                    <Td>
                                        {s5YPassed}/2
                                    </Td>
                                    <Td>
                                        {s5BPassed}/4
                                    </Td>
                                </Tr>
                                <Tr bg={(s6YPassed >= 2 && s6BPassed >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S6
                                    </Td>
                                    <Td>
                                        {s6YPassed}/2
                                    </Td>
                                    <Td>
                                        {s6BPassed}/4
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
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
                        <Table>
                            <Thead>
                                <Tr>
                                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                        Category
                                    </Td>
                                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                        Υποχρεωτικά
                                    </Td>
                                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                                        Bασικά
                                    </Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr bg={(s1YPlanned >= 2 && s1BPlanned >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S1
                                    </Td>
                                    <Td>
                                        {s1YPlanned}/2
                                    </Td>
                                    <Td>
                                        {s1BPlanned}/4
                                    </Td>
                                </Tr>
                                <Tr bg={(s2YPlanned >= 2 && s2BPlanned >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S2
                                    </Td>
                                    <Td>
                                        {s2YPlanned}/2
                                    </Td>
                                    <Td>
                                        {s2BPlanned}/4
                                    </Td>
                                </Tr>
                                <Tr bg={(s3YPlanned >= 2 && s3BPlanned >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S3
                                    </Td>
                                    <Td>
                                        {s3YPlanned}/2
                                    </Td>
                                    <Td>
                                        {s3BPlanned}/4
                                    </Td>
                                </Tr>
                                <Tr  bg={(s4YPlanned >= 2 && s4BPlanned >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S4
                                    </Td>
                                    <Td>
                                        {s4YPlanned}/2
                                    </Td>
                                    <Td>
                                        {s4BPlanned}/4
                                    </Td>
                                </Tr>
                                <Tr  bg={(s5YPlanned >= 2 && s5BPlanned >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S5
                                    </Td>
                                    <Td>
                                        {s5YPlanned}/2
                                    </Td>
                                    <Td>
                                        {s5BPlanned}/4
                                    </Td>
                                </Tr>
                                <Tr  bg={(s6YPlanned >= 2 && s6BPlanned >= 4) ? "green.200" : "transparent"}>
                                    <Td>
                                        S6
                                    </Td>
                                    <Td>
                                        {s6YPlanned}/2
                                    </Td>
                                    <Td>
                                        {s6BPlanned}/4
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </Box>
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    </Flex>)
}