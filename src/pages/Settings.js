import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Flex,
    Button,
    Link,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'

export function Settings({onResetData})
{

    const resetButtonClicked = () => {
        onResetData();
    }
    return (<Flex align="center"  flexDirection={"column"} w="100%" h="100%" mt={5}>
    <Card w={"30%"}>
        <CardHeader>
            <Heading size='md'>Settings</Heading>
        </CardHeader>
        <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Button colorScheme='red' onClick={resetButtonClicked}>Reset Data</Button>
                </Box>
                <Box>
                    Made by <Link href=''>Alekossta</Link>
                </Box>
            </Stack>
        </CardBody>
    </Card>
</Flex>)
}