import { Thead, Tr, Table, Td, Tbody, Box} from "@chakra-ui/react";
import { Course } from "../components/Course";

export function AllCourses({courses, onAdd})
{
    return (<Box overflow={"auto"} size={['sm', 'md', 'lg']}>
        <Table variant="simple" >
            <Thead>
                <Tr>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Course
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Code
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        ECTS
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Category
                    </Td>
                    <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>
                        Semester
                    </Td>
                </Tr>
            </Thead>
            <Tbody>
                {courses.map((course, index) => {
                    if(!(course.hasCourse))
                    {
                        return <Course course={course} key={index} onAdd={onAdd}/>                            
                    }
                    else
                    {
                        return <></>
                    }
                })}
            </Tbody>
        </Table>
    </Box>);
}