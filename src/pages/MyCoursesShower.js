import { TableContainer, Thead, Tr, Table, Td, Tbody, Text} from "@chakra-ui/react";
import { MyCourse } from "../components/MyCourse";


export function MyCoursesShower({courses, onRemove, onChangeGrade, onUpdateActivity, stateFunction, showActivity, emptyComponent : EmptyComponent})
{
    return (
        courses.filter(course => stateFunction(course)).length > 0 ? (
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Td>Course</Td>
                            <Td>Code</Td>
                            <Td>ECTS</Td>
                            <Td>Category</Td>
                            <Td>Semester</Td>
                            <Td>Grade</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {courses.map((course, index) => {
                            if (stateFunction(course)) {
                                return (
                                    <MyCourse 
                                        course={course} 
                                        key={index} 
                                        onRemove={onRemove} 
                                        onChangeGrade={onChangeGrade} 
                                        onUpdateActivity={onUpdateActivity} 
                                        showActivity={showActivity} 
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        ) : (
            <EmptyComponent />
        )
    );
}