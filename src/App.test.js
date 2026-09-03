import { mergeIntoCourseData } from "./App";

describe("course catalog migration", () => {
  test("restores bundled catalog fields that are missing from saved data", () => {
    const staleSavedCourses = [
      {
        name: "Αλγόριθμοι Θεμελιώσεις Μηχανικής Μάθησης",
        code: "ΘΠ22",
        ECTS: "6",
        category: "ΠΜ",
        hasCourse: true,
        grade: 8,
      },
    ];

    const migratedCourses = mergeIntoCourseData(staleSavedCourses);
    const course = migratedCourses.find(({ code }) => code === "ΘΠ22");

    expect(course).toMatchObject({
      name: "Αλγόριθμοι - Θεμελιώσεις Μηχανικής Μάθησης",
      semester: "6",
      hasCourse: true,
      grade: 8,
    });
  });
});
