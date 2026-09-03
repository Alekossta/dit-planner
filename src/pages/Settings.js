import {
    Box,
    Heading,
    Stack,
    StackDivider,
    Flex,
    Button,
    Link,
    Text,
    Badge,
    Input,
    Wrap,
    WrapItem,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { useRef } from 'react'
import { MaintenanceAlert } from '../components/MaintenanceAlert'


export function Settings({ onResetData, onImportData, onExportData, onExportPassed, onExportPlanned, version }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const confirmResetClicked = () => {
        onClose();
        onResetData();
    }

    const importButtonClicked = (event) => {
        const file = event.target.files[0];
        if (file) {
          onImportData(file);
        }
        // reset so picking the same file again still fires onChange
        event.target.value = "";
      };

      const exportButtonClicked = () => {
        onExportData();
      };

    return (<Flex align="center" flexDirection={"column"} w="100%" h="100%" mt={5} mb={10}>
        <Box w={['95%', '75%', '45%']}>
            <Card w={"100%"}>
                <CardHeader pb={0}>
                    <Flex align="center" justify="space-between">
                        <Heading size='md'>Settings</Heading>
                        <Badge colorScheme='blue' borderRadius='md' px={2}>v{version}</Badge>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='5'>
                        <Box>
                            <Input
                                type="file"
                                accept=".json"
                                onChange={importButtonClicked}
                                display="none"
                                id="importInput"
                            />
                            <Heading size='sm' mb={1}>Backup</Heading>
                            <Text fontSize='sm' color='gray.400' mb={3}>
                                Save all your data to a raw file, or restore it from one.
                                Only raw files can be imported.
                            </Text>
                            <Wrap spacing={2}>
                                <WrapItem>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => document.getElementById("importInput").click()}
                                    >
                                        Import raw
                                    </Button>
                                </WrapItem>
                                <WrapItem>
                                    <Button colorScheme="blue" onClick={exportButtonClicked}>
                                        Export raw
                                    </Button>
                                </WrapItem>
                            </Wrap>
                        </Box>
                        <Box>
                            <Heading size='sm' mb={1}>Course exports</Heading>
                            <Text fontSize='sm' color='gray.400' mb={3}>
                                Export only a part of your courses to share them.
                                These files cannot be imported back.
                            </Text>
                            <Wrap spacing={2}>
                                <WrapItem>
                                    <Button colorScheme="teal" onClick={onExportPassed}>
                                        Export passed courses
                                    </Button>
                                </WrapItem>
                                <WrapItem>
                                    <Button colorScheme="teal" onClick={onExportPlanned}>
                                        Export planned courses
                                    </Button>
                                </WrapItem>
                            </Wrap>
                        </Box>
                        <Box>
                            <Heading size='sm' mb={1} color='red.300'>Danger zone</Heading>
                            <Text fontSize='sm' color='gray.400' mb={3}>
                                Delete all your courses, grades and progress and start fresh.
                                This cannot be undone.
                            </Text>
                            <Button colorScheme='red' onClick={onOpen}>Reset Data</Button>
                            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                            Reset Data
                                        </AlertDialogHeader>
                                        <AlertDialogBody>
                                            Are you sure? All your courses, grades and progress will be deleted. This cannot be undone.
                                        </AlertDialogBody>
                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme='red' onClick={confirmResetClicked} ml={3}>
                                                Reset Data
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </Box>
                        <Box>
                            <Heading size='sm' mb={1}>About</Heading>
                            <Text fontSize='sm' color='gray.400'>
                                Made by <Link href='https://www.alexstavrin.com/' color={"blue.400"} isExternal>Alex Stavrin</Link>
                            </Text>
                            <Text fontSize='sm' color='gray.400' mt={1}>
                                Contributors:{' '}
                                <Link href='https://github.com/matinanadali' isExternal color={"blue.400"}>matinanadali</Link>
                                {', '}DanielPikilidis{', '}vaghred{', '}
                                <Link href='https://github.com/EncodedMind' isExternal color={"blue.400"}>Dimitris</Link>
                            </Text>
                            <Text fontSize='sm' color='gray.400' mt={1}>
                                Contribute in <Link href='https://github.com/alex-stavrin/dit-planner' color={"blue.400"} isExternal>Github</Link>
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <MaintenanceAlert mt={4} />
        </Box>

    </Flex>)
}
