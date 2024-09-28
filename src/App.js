import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box, Flex, useToast } from '@chakra-ui/react';
import {Home} from "./pages/Home"
import { Settings } from './pages/Settings';
import { MyCoursesShower } from './pages/MyCoursesShower';
import { coursesData } from "./coursesData";
import { useState,useEffect  } from "react";
import { AllCourses } from './pages/AllCourses';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Text } from '@chakra-ui/react'
import BurgerHeader from './components/BurgerHeader';

function App() {
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
      if(isFirstLoad)
      {
          const savedCourses = localStorage.getItem("courses");
          if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
          }
          else
          {
            setCourses(coursesData);
          }
          setFirstLoad(false);
      }
  }, []);

  useEffect(() => {
    if(!isFirstLoad)
    {
      localStorage.setItem("courses", JSON.stringify(courses));   
    }

  }, [courses]);

  const resetData = () => {
    localStorage.removeItem('courses');
    setCourses(coursesData);
    showToast("Data Reset", "All your data was deleted.", "success");
  };

  const showToast = (title,description, status) => {
      toast({
        title,
        description,
        status,
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle"
      });
    };

  const addHasCourse = (addedCourse) => {
      setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.code === addedCourse.code ? { ...course, hasCourse: true } : course
          )
      );
      showToast("Course Added", "Added " + addedCourse.name + " to planned courses", "success");
  };

  const removeHasCourse = (removedCourse) => {
      setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.code === removedCourse.code ? { ...course, hasCourse: false, grade:0, isActive: false } : course
          )
      );
      showToast("Course Removed", "Removed " + removedCourse.name + " from planned courses", "info");
  };

  const changeGrade = (newGrade, changedCourse) => {
    if(newGrade >= 0 && newGrade <= 10)
    {
      if(newGrade < 5 && changedCourse.grade >= 5)
        {
          showToast("Removed Passed Course", "Removed " + changedCourse.name + " from passed courses", "info");
        }
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.code === changedCourse.code ? { ...course, grade: newGrade } : course
            )
        );
        if(newGrade >= 5)
        {
            showToast("Passed Course!", "Added " + changedCourse.name + " to passed courses", "success");
        }
    }
  };

  const updateActivity = (newActivity, updatedCourse) => {
      setCourses((prevCourses) =>
          prevCourses.map((course) =>
              course.code === updatedCourse.code ? { ...course, isActive: newActivity } : course
          )
      );
      if(newActivity)
      {
          showToast("Added current course", "Added " + updatedCourse.name + " to current courses", "success");
      }
      else
      {
          showToast("Removed current course", "Removed " + updatedCourse.name + " from current courses", "info");

      }
  };

  const currentCourseState = (course) =>
  {
    return course.isActive && !(course.grade >= 5) && course.hasCourse;
  }

  const plannedCourseState = (course) =>
  {
    return course.hasCourse && !(course.isActive) && !(course.grade >= 5)
  }

  const passedCourseState = (course) =>
  {
    return course.hasCourse && course.grade >= 5
  }

  const noCurrentComponent = () => {
    return <Text>You have no current classes. Find some in{" "}
      <ChakraLink as={ReactRouterLink} to='/dit-planner/planned' color='blue.500'>
          planned courses.
      </ChakraLink>
    </Text>
  }

  const noPassedComponent = () => {
    return <Text>You have no passed classes. With a grade higher or equal to 5 it will be added here. Grade your classes in{" "}
      <ChakraLink as={ReactRouterLink} to='/dit-planner/planned' color='blue.500'>
          planned courses.
      </ChakraLink>
      {" "}or{" "}
      <ChakraLink as={ReactRouterLink} to='/dit-planner/current' color='blue.500'>
          current courses.
      </ChakraLink>
    </Text>
  }

  const noPlannedComponent = () => {
    return <Text>You have no planned classes. Find some in{" "}
      <ChakraLink as={ReactRouterLink} to='/dit-planner/all' color='blue.500'>
          all courses.
      </ChakraLink>
    </Text>
  }

  return (
    <Box>
      <BurgerHeader/>     
      <Flex w="100%" h="100%" flexDirection="column">
        <Routes>
          <Route path="/dit-planner" element={<Home courses={courses}/>} />

          <Route path="/dit-planner/current" element=
          {<MyCoursesShower courses={courses} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
           stateFunction={currentCourseState} showActivity={true} emptyComponent={noCurrentComponent}/>}/>

          <Route path="/dit-planner/passed" element=
          {<MyCoursesShower courses={courses} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
           stateFunction={passedCourseState} showActivity={false} emptyComponent={noPassedComponent}/>}/>

          <Route path="/dit-planner/planned" element=
          {<MyCoursesShower courses={courses} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
           stateFunction={plannedCourseState} showActivity={true} emptyComponent={noPlannedComponent}/>}/>

          <Route path='/dit-planner/all' element={<AllCourses courses={courses} onAdd={addHasCourse}/>}></Route>
          <Route path="/dit-planner/settings" element={<Settings onResetData={resetData}/>} />
        </Routes>
      </Flex>
    </Box>


  );
}

export default App;
