import { Thead, Tr, Table, Td, Tbody, Box} from "@chakra-ui/react";
import { MyCourse } from "../components/MyCourse";

export function MyCoursesShower({courses, onRemove, onChangeGrade, onUpdateActivity, stateFunction, showActivity, emptyComponent : EmptyComponent, showGrade})
{
    return (
        courses.filter(course => stateFunction(course)).length > 0 ? (
            <Box w={"100%"}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>Course</Td>
                            <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>Code</Td>
                            <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>ECTS</Td>
                            <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>Category</Td>
                            <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>Semester</Td>
                            {showGrade && <Td fontSize={['xs', 'xs', 'lg']}  px={0.5}>Grade</Td>}
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
                                        showGrade={showGrade}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </Tbody>
                </Table>
            </Box>
        ) : (
            <EmptyComponent />
        )
    );
}