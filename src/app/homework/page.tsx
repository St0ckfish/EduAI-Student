/* eslint-disable @next/next/no-img-element */
"use client";
import Container from "~/_components/Container";
import * as React from "react";
import { Calendar } from "~/components/ui/calendar";
import { Text } from "~/_components/Text";
import { useGetAllHomeWorks } from "~/APIs/hooks/useHomeWork";
import { format } from "date-fns";
import Spinner from "~/_components/Spinner";
import type { Homework } from "~/types";
import useLanguageStore from "~/APIs/store";

function CalendarDemo({
  onDateSelect,
}: {
  onDateSelect: (date: Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateSelect(newDate);
    }
  };
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateSelect}
      className="flex w-fit justify-center rounded-md max-[1080px]:w-full"
    />
  );
}

const Homework = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedSessionId, setSelectedSessionId] = React.useState<
    number | null
  >(null);

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  function formatDateTimeBeautifully(dateString: string): string {
    const date = new Date(dateString);

    const dayNames = [
      translate("Sunday", "Dimanche", "الأحد"),
      translate("Monday", "Lundi", "الاثنين"),
      translate("Tuesday", "Mardi", "الثلاثاء"),
      translate("Wednesday", "Mercredi", "الأربعاء"),
      translate("Thursday", "Jeudi", "الخميس"),
      translate("Friday", "Vendredi", "الجمعة"),
      translate("Saturday", "Samedi", "السبت"),
    ];

    const monthNames = [
      translate("January", "Janvier", "يناير"),
      translate("February", "Février", "فبراير"),
      translate("March", "Mars", "مارس"),
      translate("April", "Avril", "أبريل"),
      translate("May", "Mai", "مايو"),
      translate("June", "Juin", "يونيو"),
      translate("July", "Juillet", "يوليو"),
      translate("August", "Août", "أغسطس"),
      translate("September", "Septembre", "سبتمبر"),
      translate("October", "Octobre", "أكتوبر"),
      translate("November", "Novembre", "نوفمبر"),
      translate("December", "Décembre", "ديسمبر"),
    ];

    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${dayName}, ${monthName} ${dayOfMonth}, ${year} ${translate(
      "at",
      "à",
      "في"
    )} ${hours}:${formattedMinutes} ${ampm}`;
  }

  const formattedDate = React.useMemo(
    () => format(selectedDate, "yyyy-MM-dd"),
    [selectedDate]
  );

  const { data: homeworks, isLoading: isHomework } = useGetAllHomeWorks(
    formattedDate
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSessionId(null);
  };

  return (
    <Container>
      <div className="mb-4 flex w-full gap-10 max-[1080px]:grid">
        <div className="flex h-fit">
          <CalendarDemo onDateSelect={handleDateSelect} />
        </div>

        <div className="grid w-full gap-2 rounded-md bg-bgPrimary p-4">
          <div className="flex w-full items-start justify-between">
            <Text font={"bold"} size={"2xl"}>
              {translate("Homework", "Devoirs", "الواجبات")}
            </Text>
          </div>
          {isHomework && selectedSessionId ? (
            <div className="flex w-full justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="grid h-full items-start">
              {homeworks?.data?.content && homeworks.data.content.length > 0 ? (
                homeworks?.data.content.map((homework: Homework) => (
                  <div
                    key={homework.id}
                    className="mb-2 rounded-md border border-borderPrimary p-4"
                  >
                    <div className="grid h-full gap-2 border-l-4 border-primary px-3">
                      <div className="flex items-start justify-between">
                        <Text font="bold" size="xl">
                          {homework.title}
                        </Text>
                      </div>
                      <div>
                        <Text color="error" font="medium">
                          {translate("Deadline", "Date limite", "الموعد النهائي")}:{" "}
                          {formatDateTimeBeautifully(homework.deadline)}
                        </Text>
                        <Text color="gray">{homework.description}</Text>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  {translate(
                    "No homework found for the selected session",
                    "Aucun devoir trouvé pour la session sélectionnée",
                    "لم يتم العثور على واجبات للجلسة المحددة"
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Homework;
