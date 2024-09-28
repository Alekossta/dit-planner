import { Tr, Td, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';
export function Course({course, onAdd})
{
    function onClickButton()
    {
        onAdd(course);
    }
    return (<Tr key={course.code} _hover={{ bg: "green.100", cursor: "pointer" } } onClick={onClickButton}>
        <Td>
            <Icon as={ChevronRightIcon} />
            {course.name}
        </Td>
        <Td>{course.code}</Td>
        <Td>{course.ECTS}</Td>
        <Td>{course.category}</Td>
        <Td>{course.semester}</Td>
    </Tr>)
}