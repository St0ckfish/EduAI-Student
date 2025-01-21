"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import {
  useGetAllAcademicYear,
  useGetSemesterByYear,
  useGetAllGrades,
} from "~/APIs/hooks/useGrades";
import useLanguageStore from "~/APIs/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const Grades = () => {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const { data: academicYears, isLoading: isLoadingYears } = useGetAllAcademicYear();
  const { data: semesters, isLoading: isLoadingSemesters } = useGetSemesterByYear(
    selectedAcademicYear ?? ""
  );
  const { data: gradesData, isLoading: isLoadingGrades } = useGetAllGrades(
    selectedSemester ?? ""
  );

  return (
    <Container>
      <div className="flex w-full items-center justify-between gap-4">
        {/* Academic Year Select */}
        <Select
          value={selectedAcademicYear || ""}
          onValueChange={setSelectedAcademicYear}
        >
          <SelectTrigger className={`w-full border bg-bgPrimary border-borderPrimary`}>
            <SelectValue placeholder={translate("Select Academic Year", "Sélectionnez une année académique", "اختر السنة الدراسية")} />
          </SelectTrigger>
          <SelectContent>
            {academicYears?.data?.map((year: any) => (
              <SelectItem key={year.id} value={year.id.toString()}>
                {year.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Semester Select */}
        <Select
          value={selectedSemester ?? ""}
          onValueChange={setSelectedSemester}
          disabled={!selectedAcademicYear}
        >
          <SelectTrigger className={`w-full border bg-bgPrimary border-borderPrimary`}>
            <SelectValue placeholder={translate("Select Semester", "Sélectionnez un semestre", "اختر الفصل الدراسي")} />
          </SelectTrigger>
          <SelectContent>
            {semesters?.data?.map((semester: any) => (
              <SelectItem key={semester.id} value={semester.id.toString()}>
                {semester.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-10 flex h-full w-full items-center justify-center">
        <div className="flex w-full rounded-md bg-bgPrimary p-4">
          <div className="relative w-full overflow-x-auto sm:rounded-lg">
            <Text font="bold" size="2xl" className="mb-4">
              {translate("Continuous Evaluation Scores", "Scores d'évaluation continue", "درجات التقييم المستمر")}
            </Text>

            {/* Loading and Empty States */}
            {isLoadingYears || isLoadingSemesters || isLoadingGrades ? (
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            ) : (
              <table className="w-full overflow-x-auto p-4 text-left text-sm text-textPrimary border-separate border-spacing-y-2">
                <thead className="text-textPrimary text-xs uppercase">
                  <tr>
                    <th>{translate("Points", "Points", "النقاط")}</th>
                    <th>{translate("Course Name", "Nom du cours", "اسم المادة")}</th>
                    <th>{translate("First Exam Score", "Score du premier examen", "درجة الامتحان الأول")}</th>
                    <th>{translate("Second Exam Score", "Score du deuxième examen", "درجة الامتحان الثاني")}</th>
                    <th>{translate("Third Exam Score", "Score du troisième examen", "درجة الامتحان الثالث")}</th>
                    <th>{translate("Fourth Exam Score", "Score du quatrième examen", "درجة الامتحان الرابع")}</th>
                    <th>{translate("Continuous Assessment", "Évaluation continue", "التقييم المستمر")}</th>
                    <th>{translate("Coefficient", "Coefficient", "المعامل")}</th>
                    <th>{translate("Passed Course", "Cours réussi", "المادة ناجحة")}</th>
                    <th>{translate("GPA", "Moyenne générale", "المعدل التراكمي")}</th>
                  </tr>
                </thead>
                <tbody>
                  {gradesData?.courses?.length ? (
                    gradesData.courses.map((grade: any, index: number) => (
                      <tr key={index} className="bg-bgSecondary font-semibold hover:bg-primary hover:text-white">
                        <th scope="row" className="whitespace-nowrap rounded-s-2xl px-6 py-4 font-medium text-textSecondary">
                          {grade.points || '-'}
                        </th>
                        <td className="whitespace-nowrap px-6 py-4">{grade.courseName || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{grade.firstExamScore || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{grade.secondExamScore || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{grade.thirdExamScore || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{grade.fourthExamScore || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{grade.continuousAssessment || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{grade.coefficient || '-'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{grade.passedCourse || '-'}</td>
                        <td className="whitespace-nowrap rounded-e-2xl px-6 py-4">
                          {grade.gpa || '-'}
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center">
                        {translate("No grades found", "Aucune note trouvée", "لا توجد درجات")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            <div className="mt-4">
              <div>{translate("Average", "Moyenne", "المعدل")}: {gradesData?.averageOfThisSemester || '-'}</div>
              <div>{translate("Total Coefficient", "Coefficient total", "إجمالي المعامل")}: {gradesData?.totalCoefficient || '-'}</div>
              <div>{translate("Total GPA", "Moyenne générale totale", "إجمالي المعدل التراكمي")}: {gradesData?.totalGPA || '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Grades;
