import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import {Home} from "./pages/Home"
import { Settings } from './pages/Settings';
import { coursesData } from "./coursesData";
import { coursesDataVersion } from './coursesDataVersion';
import { useState,useEffect  } from "react";
import { AllCourses } from './pages/AllCourses';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Text } from '@chakra-ui/react'
import BurgerHeader from './components/BurgerHeader';
import { MakeCourse } from './pages/MakeCourse';
import { saveAs } from "file-saver"; // To export course data
import CurrentCourses from './pages/CurrentCourses';
import { Box } from '@chakra-ui/react';
import PassedCourses from './pages/PassedCourses';
import PlannedCourses from './pages/PlannedCourses';
import {  useColorMode } from "@chakra-ui/react";

// Course codes can repeat across the catalog (e.g. the same special-topics course
// offered in two semesters), so every course gets a unique `id` used for all
// matching/keys. `code` is only ever shown to the user. Existing valid ids are
// preserved; legacy data (saved or imported before ids existed) gets ids assigned.
const normalizeCourses = (list) => {
  const used = new Set();
  return list.map((course) => {
    let id = course.id;
    if (!id || used.has(id)) {
      const base = course.code || course.category || "course";
      id = base;
      let n = 1;
      while (used.has(id)) {
        id = `${base}#${n++}`;
      }
    }
    used.add(id);
    return course.id === id ? course : { ...course, id };
  });
};

const parseSavedCourses = (savedCourses) => {
  if (!savedCourses) {
    return null;
  }

  try {
    const parsedCourses = JSON.parse(savedCourses);
    return Array.isArray(parsedCourses) ? parsedCourses : null;
  } catch {
    return null;
  }
};

const courseSyncKeys = (course) => [
  `id:${course.id || ""}`,
  `exact:${course.code || ""}|${course.name || ""}|${course.semester || ""}|${course.ECTS || ""}|${course.category || ""}`,
  `code-name:${course.code || ""}|${course.name || ""}|${course.ECTS || ""}|${course.category || ""}`,
  `name:${course.name || ""}|${course.ECTS || ""}|${course.category || ""}`,
];

const buildUniqueCourseIndex = (list) => {
  const index = new Map();
  list.forEach((course, position) => {
    courseSyncKeys(course).forEach((key) => {
      index.set(key, index.has(key) ? null : position);
    });
  });
  return index;
};

const mergeSavedCourseState = (course, savedCourse) => {
  const mergedCourse = { ...course };

  if (course.hasCourse || savedCourse.hasCourse) {
    mergedCourse.hasCourse = true;
  } else if (course.hasCourse === false || savedCourse.hasCourse === false) {
    mergedCourse.hasCourse = false;
  }

  if (course.isActive || savedCourse.isActive) {
    mergedCourse.isActive = true;
  } else if (course.isActive === false || savedCourse.isActive === false) {
    mergedCourse.isActive = false;
  }

  const currentGrade = Number(course.grade);
  const savedGrade = Number(savedCourse.grade);
  if (!Number.isNaN(savedGrade) && (Number.isNaN(currentGrade) || savedGrade > currentGrade)) {
    mergedCourse.grade = savedCourse.grade;
  }

  return mergedCourse;
};

// merge a user's saved course state (grades, passed/planned, custom MC courses)
// into a fresh copy of the latest bundled course catalog
export const mergeIntoCourseData = (savedList) => {
  const savedCourses = normalizeCourses(savedList);
  // deep copy so we never mutate the imported coursesData module
  let newCourses = normalizeCourses(coursesData.map(course => ({ ...course })));
  const newCourseIndex = buildUniqueCourseIndex(newCourses);
  savedCourses.forEach((itemOld) => {
    const targetIndex = courseSyncKeys(itemOld)
      .map((key) => newCourseIndex.get(key))
      .find((index) => index !== undefined && index !== null);

    if(targetIndex !== undefined)
    {
      newCourses[targetIndex] = mergeSavedCourseState(newCourses[targetIndex], itemOld);
    }
  })
  // add our own user courses
  savedCourses.forEach(course => {
    if(course.category === "MC")
    {
      newCourses.push(course);
    }
  });
  return normalizeCourses(newCourses);
};

function App() {
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  const [isFirstLoad, setFirstLoad] = useState(true);
  const { setColorMode } = useColorMode();


  useEffect(() => {
      // force dark mode
      setColorMode("dark");
      if(isFirstLoad)
      {
          const currentVersion = String(coursesDataVersion);
          const savedCourses = localStorage.getItem("courses");
          const parsedSavedCourses = parseSavedCourses(savedCourses);
          const version = localStorage.getItem("version");
          if(!version)
          {
            if(!savedCourses)
            {
              // initial load
              setCourses(normalizeCourses(coursesData));
            }
            else
            {
              // very old sync
              syncSavedWithCourseData();
            }
            localStorage.setItem("version", currentVersion);
          }
          else
          { 
            if(version !== currentVersion)
            {
               // other version
              syncSavedWithCourseData();
              localStorage.setItem("version", currentVersion);
            }
            else
            {
              // Always reconcile saved progress with the bundled catalog. This
              // keeps additions and catalog fixes visible even if a release
              // accidentally ships without incrementing coursesDataVersion.
              setCourses(parsedSavedCourses
                ? mergeIntoCourseData(parsedSavedCourses)
                : normalizeCourses(coursesData));
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
    const fresh = normalizeCourses(coursesData);
    localStorage.setItem("courses", JSON.stringify(fresh));
    setCourses(fresh);
    showToast("Data Reset", "All your data was deleted.", "success");
  };

  const makeCourse = (name, ECTS) => {
    // find a code that no existing course uses (array length can repeat after deletions)
    const codePrefix = "MC" + name.substring(0, 2).toUpperCase();
    const codeExists = (code) => courses.some(course => course.code === code);
    let suffix = courses.length;
    while(codeExists(codePrefix + suffix))
    {
      suffix++;
    }
    let newCourse = {name, code: codePrefix + suffix, ECTS, category: "MC", hasCourse:true, userMade:true}
    setCourses(prevItems => normalizeCourses([...prevItems, newCourse]));
    showToast("Course created", newCourse.name + " added to planned courses", "success");
  }

  const exportToFile = (data, type = "raw") => {
    // Get the current date
    const currentDate = new Date();

    // Format the date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0];

    const fileNamePrefixes = {
      raw: "coursesData",
      passed: "passedCourses",
      planned: "plannedCourses",
    };

    // Append the date to the filename (useful if you have multiple saves)
    const fileNameWithDate = `${fileNamePrefixes[type]}_${formattedDate}.json`;

    // Wrap in an envelope with a type so imports can recognise the file
    const exportData = { type, courses: data };

    const fileToSave = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    saveAs(fileToSave, fileNameWithDate);
  };

  const importFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      let importedData;
      try {
        importedData = JSON.parse(event.target.result);
      } catch (error) {
        showToast(
          "Import Failed",
          "The selected file is not valid JSON.",
          "error",
        );
        return;
      }
      // New exports are wrapped in an envelope { type, courses }.
      // Old exports were a plain array, which was always the raw data.
      let importedCourses = importedData;
      if(importedData && !Array.isArray(importedData) && typeof importedData === "object")
      {
        if(importedData.type === "passed" || importedData.type === "planned")
        {
          showToast(
            "Import Failed",
            `This file is a "${importedData.type}" courses export. Only raw exports can be imported.`,
            "error",
          );
          return;
        }
        if(importedData.type !== "raw")
        {
          showToast(
            "Import Failed",
            "The selected file is not a valid courses export.",
            "error",
          );
          return;
        }
        importedCourses = importedData.courses;
      }
      if(!Array.isArray(importedCourses) || importedCourses.some(course => typeof course !== "object" || course === null || typeof course.code !== "string"))
      {
        showToast(
          "Import Failed",
          "The selected file is not a valid courses export.",
          "error",
        );
        return;
      }
      // merge into the current catalog so files exported from an
      // older version of the app still end up with up-to-date course data
      setCourses(mergeIntoCourseData(importedCourses));
      showToast(
        "Data Imported",
        "Your courses data has been successfully imported.",
        "success",
      );
    };
    reader.onerror = () => {
      showToast(
        "Import Failed",
        "There was an error importing the data.",
        "error",
      );
    };
    reader.readAsText(file);
  };


  const showToast = (title,description, status) => {
      toast({
        title,
        description,
        status,
        duration: 1000,
        isClosable: true,
        position: "top",
        variant: "solid"
      });
    };

  const addHasCourse = (addedCourse) => {
      setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === addedCourse.id ? { ...course, hasCourse: true } : course
          )
      );
      showToast("Course Added", "Added " + addedCourse.name + " to planned courses", "success");
  };

  const removeHasCourse = (removedCourse) => {
      if(removedCourse.category === "MC")
      {
        const updatedArray = courses.filter(course => course.id !== removedCourse.id);
        setCourses(updatedArray);
        showToast("Custom Course Removed", "Removed " + removedCourse.name + " from courses because you dropped it.", "info");
      }
      else
      {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
              course.id === removedCourse.id ? { ...course, hasCourse: false, grade:0, isActive: false } : course
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
                course.id === changedCourse.id ? { ...course, grade: newGrade } : course
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
              course.id === updatedCourse.id ? { ...course, isActive: newActivity } : course
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
    const parsedSavedCourses = parseSavedCourses(notParsedCourses);
    if(parsedSavedCourses)
    {
      setCourses(mergeIntoCourseData(parsedSavedCourses));
      showToast("Synced Data", "Changes were made in the course data. Your data is synced. Look for any errors though", "success");
    }
    else
    {
      setCourses(normalizeCourses(coursesData));
      showToast("No saved data", "Loaded the latest course data instead.", "info");
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
      <Box overflow={"auto"}>
        <Routes>
          <Route path="/dit-planner" element={<Home courses={courses}/>} />

          <Route path="/dit-planner/current" element=
          {<CurrentCourses courses={courses} removeHasCourse={removeHasCourse} changeGrade={changeGrade} updateActivity={updateActivity}
          currentCourseState={currentCourseState} showActivity={true} showGrade={false} noCurrentComponent={noCurrentComponent}/>}/>

          <Route path="/dit-planner/passed" element=
          {<PassedCourses courses={courses} removeHasCourse={removeHasCourse} changeGrade={changeGrade} updateActivity={updateActivity}
            passedCourseState={passedCourseState} noPassedComponent={noPassedComponent}/>}/>

          <Route path="/dit-planner/planned" element=
          {<PlannedCourses courses={courses} removeHasCourse={removeHasCourse} changeGrade={changeGrade} updateActivity={updateActivity}
            plannedCourseState={plannedCourseState} showActivity={true} showGrade={false} noPlannedComponent={noPlannedComponent}/>}/>

          <Route path='/dit-planner/all' element={<AllCourses courses={courses} onAdd={addHasCourse}/>}></Route>

          <Route path="/dit-planner/make" element={<MakeCourse onMakeCourse={makeCourse}/>} />

          <Route path="/dit-planner/settings" element={<Settings onResetData={resetData} onExportData={() => exportToFile(courses, "raw")}
            onExportPassed={() => exportToFile(courses.filter(passedCourseState), "passed")}
            onExportPlanned={() => exportToFile(courses.filter(course => plannedCourseState(course) || passedCourseState(course) || currentCourseState(course)), "planned")}
            onImportData={importFromFile} version={coursesDataVersion} />} />
        </Routes>
        </Box>     
    </Flex>


  );
}

export default App;
