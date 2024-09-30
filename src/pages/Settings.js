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

export function Settings({onResetData, onSyncData, version})
{

    const resetButtonClicked = () => {
        onResetData();
    }

    const syncButtonClicked = () => {
        onSyncData();
    }
    
    return (<Flex align="center"  flexDirection={"column"} w="100%" h="100%" mt={5}>
    <Box w={['100%', '75%', '35%']}>
        <Card w={"100%"}>
            <CardHeader>
                <Heading size='md'>Settings</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        Version: {version}
                    </Box>
                    <Box>
                        <Button colorScheme='yellow' onClick={syncButtonClicked}>Sync Data</Button>
                    </Box>
                    <Box>
                        <Button colorScheme='red' onClick={resetButtonClicked}>Reset Data</Button>
                    </Box>
                    <Box>
                        Made by <Link href='https://github.com/Alekossta' color={"blue.500"} isExternal>Alekossta</Link>
                    </Box>
                    <Box>
                        Contribute in <Link href='https://github.com/Alekossta/dit-planner' color={"blue.500"} isExternal>Github</Link>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    </Box>

</Flex>)
}