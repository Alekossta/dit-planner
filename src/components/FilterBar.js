import React from 'react';
import { Text } from "@chakra-ui/react";
import { Box, Flex, Button, Input, Stack, Checkbox } from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
} from "chakra-react-select";

const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const categories = [
    { name: "Υποχρεωτικό", short: "ΥΜ" },
    { name: "Αυτοτελές Προαιρετικό Εργαστήριο", short: "ΕΡ" },
    { name: "Κατ'επιλογήν υποχρεωτικό", short: "ΕΥΜ" },
    { name: "Προαιρετικό", short: "ΠΜ" },
    { name: "Γενικής Παιδείας", short: "ΓΠ" },
    { name: "Project", short: "Project" },
  ];

export function FilterBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [selectedSemesters, setSelectedSemesters] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSemesterSelectChange = (selectedOptions) => {
        setSelectedSemesters(selectedOptions);
    };

    const handleCategorySelectChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
    };

    return (
        <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
            Open
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            

            <DrawerBody>
                <DrawerHeader>Search for courses</DrawerHeader>
                <Input placeholder='Type here...' />
                <DrawerHeader>Filter all courses...</DrawerHeader>

                <Stack spacing={3}>
                    <Flex justifyContent={'space-between'}>
                        <Text>By Semester:</Text>
                        <Checkbox>Select All</Checkbox>
                    </Flex>
                    
                    <Select options={[...
                        semesters.map((semester) => ({label: semester, value: semester}))
                    ]}
                    isMulti={true}
                    closeMenuOnSelect={false}
                    onChange={handleSemesterSelectChange}
                    />
                    <Flex justifyContent={'space-between'}>
                        <Text>By Category:</Text>
                        <Checkbox>Select All</Checkbox>
                    </Flex>
                    
                    <Select options={[...
                        categories.map((category) => ({label: category.name, value: category.short}))
                    ]}
                    isMulti={true}
                    closeMenuOnSelect={false}
                    onChange={handleSemesterSelectChange}
                    />
                </Stack>
                <DrawerHeader>Sort all courses...</DrawerHeader>
                <Select options={[
                        {
                            label: "By ECTS (increasing)",
                            value:"ECTS_in"
                        },
                        {
                            label: "By ECTS (decreasing)",
                            value:"ECTS_de"
                        },
                        {
                            label: "By alphabetical order",
                            value:"ALPHA"
                        }
                        ]}></Select>
            </DrawerBody>

            

            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
  )
}