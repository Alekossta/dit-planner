import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box, Flex, useToast } from '@chakra-ui/react';
import {Home} from "./pages/Home"
import { Settings } from './pages/Settings';
import { MyCoursesShower } from './pages/MyCoursesShower';
import { coursesData } from "./coursesData";
import { coursesDataVersion } from './coursesDataVersion';
import { useState,useEffect  } from "react";
import { AllCourses } from './pages/AllCourses';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Text } from '@chakra-ui/react'
import BurgerHeader from './components/BurgerHeader';
import { MakeCourse } from './pages/MakeCourse';

function App() {
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
      if(isFirstLoad)
      {
          const savedCourses = localStorage.getItem("courses");
          const version = localStorage.getItem("version");
          if(!version)
          {
            if(!savedCourses)
            {
              // initial load
              setCourses(coursesData);
            }
            else
            {
              // very old sync
              syncSavedWithCourseData();
            }
            localStorage.setItem("version", coursesDataVersion);
          }
          else
          { 
            if(version != coursesDataVersion)
            {
               // other version
              syncSavedWithCourseData();
              localStorage.setItem("version", coursesDataVersion);
            }
            else
            {
              // normal load
              setCourses(JSON.parse(savedCourses));
            }
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
    localStorage.setItem("courses", JSON.stringify(coursesData));   
    setCourses(coursesData);
    showToast("Data Reset", "All your data was deleted.", "success");
  };

  const makeCourse = (name, ECTS) => {
    let newCourse = {name, code: "MC" + name.substring(0, 2).toUpperCase() + courses.length,ECTS, category: "MC", hasCourse:true, userMade:true}
    setCourses(prevItems => [...prevItems, newCourse]);
    showToast("Course created", newCourse.name + " added to planned courses", "success");
  }


  const showToast = (title,description, status) => {
      toast({
        title,
        description,
        status,
        duration: 1000,
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
      if(removedCourse.category === "MC")
      {
        const updatedArray = courses.filter(course => course.code !== removedCourse.code);
        setCourses(updatedArray);
        showToast("Custom Course Removed", "Removed " + removedCourse.name + " from courses because you dropped it.", "info");
      }
      else
      {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.code === removedCourse.code ? { ...course, hasCourse: false, grade:0, isActive: false } : course
            )
        );
        showToast("Course Removed", "Removed " + removedCourse.name + " from planned courses", "info");
      }

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

  // in case of an update to the courseData we need to transfer the user's saved data
  // into the new courseData data structure
  const syncSavedWithCourseData = () => {
    const notParsedCourses = localStorage.getItem("courses");
    if(notParsedCourses)
    {
      const savedCourses = JSON.parse(localStorage.getItem("courses"));
      let newCourses  = coursesData;
      savedCourses.forEach((itemOld, index) => {
        newCourses.forEach((itemNew, index) => {
          if(itemOld.code === itemNew.code)
          {
            itemNew.grade = itemOld.grade;
            itemNew.isActive = itemOld.isActive;
            itemNew.hasCourse = itemOld.hasCourse;
          }
        })
      })
      // add our own user courses
      savedCourses.forEach(course => {
        if(course.category === "MC")
        {
          newCourses.push(course);
        }
      });

      setCourses(newCourses);
      showToast("Synced Data", "Changes were made in the course data. Your data is synced. Look for any erros though", "success");
    }
    else
    {
      showToast("No saved data", "You have no saved data to sync", "error");
    }  
  }

  const noCurrentComponent = () => {
    return <Flex width={"100%"} height={"100%"} alignContent={"center"} justifyContent={"center"} mt={5}>
        <Text textAlign={"center"}>You have no current classes. Find some in{" "}
          <ChakraLink as={ReactRouterLink} to='/dit-planner/planned' color='blue.500'>
              planned courses.
          </ChakraLink>
        </Text>
    </Flex>
  }

  const noPassedComponent = () => {
    return <Flex width={"100%"} height={"100%"} alignContent={"center"} justifyContent={"center"} mt={5}>
      <Text>You have no passed classes. With a grade higher or equal to 5 it will be added here. Grade your classes in{" "}
        <ChakraLink as={ReactRouterLink} to='/dit-planner/planned' color='blue.500'>
            planned courses.
        </ChakraLink>
        {" "}or{" "}
        <ChakraLink as={ReactRouterLink} to='/dit-planner/current' color='blue.500'>
            current courses.
        </ChakraLink>
      </Text>
    </Flex>
  }

  const noPlannedComponent = () => {
    return <Flex width={"100%"} height={"100%"} alignContent={"center"} justifyContent={"center"} mt={5}>
      <Text>You have no planned classes. Find some in{" "}
        <ChakraLink as={ReactRouterLink} to='/dit-planner/all' color='blue.500'>
            all courses.
        </ChakraLink>
      </Text>
    </Flex>
  }

  return (
    <Flex w="100%" h="100%" flexDirection={"column"}>
      <BurgerHeader/>     
      <Routes>
        <Route path="/dit-planner" element={<Home courses={courses}/>} />

        <Route path="/dit-planner/current" element=
        {<MyCoursesShower courses={courses} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
          stateFunction={currentCourseState} showActivity={true} showGrade={false} emptyComponent={noCurrentComponent}/>}/>

        <Route path="/dit-planner/passed" element=
        {<MyCoursesShower courses={courses} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
          stateFunction={passedCourseState} showActivity={false} showGrade={true} emptyComponent={noPassedComponent}/>}/>

        <Route path="/dit-planner/planned" element=
        {<MyCoursesShower courses={courses} onRemove={removeHasCourse} onChangeGrade={changeGrade} onUpdateActivity={updateActivity}
          stateFunction={plannedCourseState} showActivity={true} showGrade={false} emptyComponent={noPlannedComponent}/>}/>

        <Route path='/dit-planner/all' element={<AllCourses courses={courses} onAdd={addHasCourse}/>}></Route>

        <Route path="/dit-planner/make" element={<MakeCourse onMakeCourse={makeCourse}/>} />

        <Route path="/dit-planner/settings" element={<Settings onResetData={resetData} onSyncData={syncSavedWithCourseData} version={coursesDataVersion} />} />
      </Routes>
    </Flex>


  );
}

export default App;
