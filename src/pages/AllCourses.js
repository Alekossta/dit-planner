import { TableContainer, Thead, Tr, Table, Td, Tbody} from "@chakra-ui/react";
import { MyCourse } from "../components/MyCourse";
import { Course } from "../components/Course";

export function AllCourses({courses, filterCourse, onAdd})
{
    return (<TableContainer>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Td>
                        Course
                    </Td>
                    <Td>
                        Code
                    </Td>
                    <Td>
                        ECTS
                    </Td>
                    <Td>
                        Category
                    </Td>
                    <Td>
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
    </TableContainer>);
}