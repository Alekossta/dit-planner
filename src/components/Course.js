import { Tr, Td, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';
export function Course({course, onAdd})
{
    function onClickButton()
    {
        onAdd(course);
    }
    return (<Tr key={course.code} _hover={{ bg: "green.300", cursor: "pointer" } } onClick={onClickButton}>
        <Td  fontSize={['xs', 'xs', 'lg']}  px={0.25}>
            <Icon as={ChevronRightIcon} />
            {course.name}
        </Td>
        <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>{course.code}</Td>
        <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>{course.ECTS}</Td>
        <Td fontSize={['xs', 'xs', 'lg']}  px={0.25}>{course.category}</Td>
        <Td fontSize={['xs', 'xs', 'lg']} px={0.25}>{course.semester}</Td>
    </Tr>)
}