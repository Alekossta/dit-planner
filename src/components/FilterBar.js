import React from 'react';
import { Text } from "@chakra-ui/react";
import { Flex, Button, Stack, Checkbox, Input, Spacer } from '@chakra-ui/react';
import { SearchBar } from "./SearchBar";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { allCategories, allSemesters } from "../coursesData";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

import { Select } from "chakra-react-select";

export function FilterBar({categories, setCategories, semesters, setSemesters, setSortBy }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [allSemestersSelected, setAllSemestersSelected] = useState(semesters.length === allSemesters.length);
    const [allCategoriesSelected, setAllCategoriesSelected] = useState(categories.length === allCategories.length);

    const initialSemesters = semesters;
    const initialCategories = categories;

    const [selectedSemesters, setSelectedSemesters] = useState(initialSemesters);
    const [selectedCategories, setSelectedCategories] = useState(initialCategories);
    
    const handleOpen = () => {
        onOpen();
    }

    const handleSelectAllSemestersClick = () => {
        if (!allSemestersSelected) {
            setSelectedSemesters(allSemesters.map(semester => ({ label: semester.label, value: semester.value })));
        }

        setAllSemestersSelected(!allSemestersSelected);
    }

    const handleSelectAllCategoriesClick = () => {
        if (!allCategoriesSelected) {
            setSelectedCategories(allCategories.map(category => ({ label: category.label, value: category.value })));
        }

        setAllCategoriesSelected(!allCategoriesSelected);
    }

    const handleCancel = () => {
        setCategories(initialCategories);
        setSemesters(initialSemesters);
        onClose();
    }

    const handleApply = () => {
        setCategories(selectedCategories);
        setSemesters(selectedSemesters);
        onClose();
    }
    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={handleOpen} style={{backgroundColor: "#4299e1", borderRadius: '10%'}}>
                Filter
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
                
                <DrawerHeader style={{paddingLeft: 0}}>Filter all courses...</DrawerHeader>

                <Stack spacing={3}>
                    <Flex justifyContent={'space-between'}>
                        <Text>By Semester:</Text>
                        <Checkbox isChecked={allSemestersSelected} onChange={handleSelectAllSemestersClick}>Select All</Checkbox>
                    </Flex>
                    
                    <Select options={[...
                        allSemesters.map((semester) => ({label: semester.label, value: semester.value}))
                    ]}
                    isMulti={true}
                    value={selectedSemesters}
                    closeMenuOnSelect={false}
                    onChange={(selected) => {
                        setSelectedSemesters(selected);
                        setAllSemestersSelected(selected.length === allSemesters.length);
                    }}
                    />
                    <Flex justifyContent={'space-between'}>
                        <Text>By Category:</Text>
                        <Checkbox
                            isChecked={allCategoriesSelected} onChange={handleSelectAllCategoriesClick}>Select All</Checkbox>
                    </Flex>
                    
                    <Select options={[...
                        allCategories.map((category) => ({label: category.label, value: category.value}))
                    ]}
                    value={selectedCategories}
                    isMulti={true}
                    closeMenuOnSelect={false}
                    onChange={(selected) => {
                        setSelectedCategories(selected);
                        setAllCategoriesSelected(selected.length === allCategories.length);
                    }}
                    />
                </Stack>
                <DrawerHeader style={{paddingLeft: 0}}>Sort courses...</DrawerHeader>
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
                        ]}
                        onChange={(selected) => setSortBy(selected.value)} 
                />
            </DrawerBody>

            

            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={handleCancel}>
                Cancel
                </Button>
                <Button colorScheme='blue' onClick={handleApply}>Apply</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
  )
}