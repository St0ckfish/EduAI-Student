"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Button from "~/_components/Button";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import {
  useGetAllPreviousExams,
  useGetAllUpcomingExams,
} from "~/APIs/hooks/useExam";
import useLanguageStore from "~/APIs/store";

const Exam = () => {
  const [viewMode, setViewMode] = useState<"previous" | "upcoming">("previous");

  const { data: dataUpcomingExams, isLoading: isLoadingUpcomingExams } =
    useGetAllUpcomingExams();
  const { data: dataPreviousExams, isLoading: isLoadingPreviousExams } =
    useGetAllPreviousExams();

    const language = useLanguageStore((state) => state.language);
    const translate = (en: string, fr: string, ar: string) => {
      return language === "fr" ? fr : language === "ar" ? ar : en;
    };

  const renderExams = (data: any, type: "Previous" | "Upcoming") => {
    if (!data || data.length === 0) {
      return (
        <Text font="semiBold" size="xl">
          {translate(
            `No ${type.toLowerCase()} exams found.`,
            `Aucun examen ${type.toLowerCase()} trouvé.`,
            `لا توجد امتحانات ${type === "Previous" ? "سابقة" : "قادمة"}.`
          )}
        </Text>
      );
    }

    return (
      <div className="relative w-full overflow-auto sm:rounded-lg">
        <Text font="bold" size="2xl" className="mb-4">
          {translate(
            `${type} Exams`,
            `Examens ${type === "Previous" ? "précédents" : "à venir"}`,
            `الامتحانات ${type === "Previous" ? "السابقة" : "القادمة"}`
          )}
        </Text>
        <table className="w-full border-separate border-spacing-y-2 overflow-x-auto p-4 text-left text-sm text-textPrimary">
          <thead className="text-xs uppercase text-textPrimary">
            <tr>
              <th className="whitespace-nowrap px-6 py-3">{translate("Title", "Titre", "العنوان")}</th>
              <th className="whitespace-nowrap px-6 py-3">{translate("Score", "Score", "الدرجة")}</th>
              <th className="whitespace-nowrap px-6 py-3">{translate("Class", "Classe", "الفصل")}</th>
              <th className="whitespace-nowrap px-6 py-3">{translate("Exam Type", "Type d'examen", "نوع الامتحان")}</th>
              <th className="whitespace-nowrap px-6 py-3">{translate("Exam Beginning", "Début de l'examen", "بداية الامتحان")}</th>
              <th className="whitespace-nowrap px-6 py-3">{translate("Exam Ending", "Fin de l'examen", "نهاية الامتحان")}</th>
              <th className="whitespace-nowrap px-6 py-3">{translate("Exam Date", "Date d'examen", "تاريخ الامتحان")}</th>
            </tr>
          </thead>
          <tbody className="rounded-lg">
            {data?.map((exam: any, index: number) => (
              <tr
                key={index}
                className="bg-bgSecondary font-semibold hover:bg-primary hover:text-white"
              >
                <th
                  className="whitespace-nowrap rounded-s-2xl px-6 py-4 font-medium text-textSecondary"
                >
                  {exam.courseName}
                </th>
                <td className="whitespace-nowrap px-6 py-4">{exam.examGrade}</td>
                <td className="whitespace-nowrap px-6 py-4">{exam.className}</td>
                <td className="whitespace-nowrap px-6 py-4">{exam.examTypeName}</td>
                <td className="whitespace-nowrap px-6 py-4">{exam.examBeginning}</td>
                <td className="whitespace-nowrap px-6 py-4">{exam.examEnding}</td>
                <td className="whitespace-nowrap rounded-e-2xl px-6 py-4">{exam.examDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (isLoadingUpcomingExams || isLoadingPreviousExams) {
    return (
      <Container>
        <div className="flex h-[500px] w-full items-center justify-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <div className="flex w-full items-center justify-between gap-7">
          <div className="flex w-1/2 md:w-[400px] items-center gap-10">
            <Button
              className="text-sm md:text-md"
              theme={viewMode === "previous" ? "solid" : "outline"}
              onClick={() => setViewMode("previous")}
            >
              {translate("Previous Exams", "Examens Précédents", "الامتحانات السابقة")}
            </Button>
            <Button
              className="text-sm md:text-md"
              theme={viewMode === "upcoming" ? "solid" : "outline"}
              onClick={() => setViewMode("upcoming")}
            >
              {translate("Upcoming Exams", "Examens à venir", "الامتحانات القادمة")}
            </Button>
          </div>
        </div>

        <div className="mt-10 flex h-full w-full items-center justify-center">
          <div className="flex w-full overflow-auto rounded-md bg-bgPrimary p-4">
            {viewMode === "previous"
              ? renderExams(dataPreviousExams?.data, "Previous")
              : renderExams(dataUpcomingExams?.data, "Upcoming")}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Exam;
