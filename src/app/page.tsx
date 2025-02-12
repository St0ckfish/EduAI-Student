"use client";
import React, { useEffect, useState } from "react";
import Box from "~/_components/Box";
import BoxGrid from "~/_components/BoxGrid";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import { Calendar } from "~/components/ui/calendar";
import { FaCircle, FaDownload, FaEllipsisV } from "react-icons/fa";
import Image from "next/image";
import { format } from "date-fns";
import { BookOpen, ChevronDown, Clock, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import Link from "next/link";
import { useGetAllCommingSchedule, useGetAttendance, useGetGpa, useGetUpCommingEvents, useGetDailyPlans } from "~/APIs/hooks/useHome";
import Spinner from "~/_components/Spinner";
import { formatDate } from "~/hooks/useFormatDate";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";
import useLanguageStore, { useUserDataStore } from "~/APIs/store";
const chartData = [
  { month: "January", gpa: 186, attendance: 80, class: 20, behavior: 54 },
  { month: "February", gpa: 305, attendance: 200, class: 24, behavior: 56 },
  { month: "March", gpa: 237, attendance: 120, class: 64, behavior: 65 },
  { month: "April", gpa: 73, attendance: 190, class: 54, behavior: 87 },
  { month: "May", gpa: 209, attendance: 130, class: 87, behavior: 48 },
  { month: "June", gpa: 214, attendance: 140, class: 68, behavior: 87 },
]
const chartConfig = {
  gpa: {
    label: "GPA",
    color: "#76E2AD",
  },
  attendance: {
    label: "Attendance",
    color: "#EC7C73",
  },
  class: {
    label: "Class Participation",
    color: "#F4BE22",
  },
  behavior: {
    label: "Student Behavior",
    color: "#AC94EC",
  },
} satisfies ChartConfig

export default function Home() {
  const [openDays, setOpenDays] = useState<Record<string | number, boolean>>({});

  // Toggle function for individual days
  const toggleDay = (day: string | number) => {
    setOpenDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };
  function CalendarDemo({
    selectedDate,
    onDateSelect,
  }: {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
  }) {
    const handleDateSelect = React.useCallback((newDate: Date | undefined) => {
      if (newDate) {
        onDateSelect(newDate);
      }
    }, [onDateSelect]);
  
    return (
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="flex w-fit justify-center rounded-md max-[1080px]:w-full"
      />
    );
  }
  const userData = useUserDataStore.getState().userData;
  const ID = userData.id
  console.log("id",ID);
  
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const { data: gpa, isLoading: isGpa } = useGetGpa()
  const { data: dailyPlans, isLoading: isDaily } = useGetDailyPlans(ID)
  const { data: attendance, isLoading: isAttendance } = useGetAttendance()
  const { data: events, isLoading: isEvents } = useGetUpCommingEvents()
  const formattedDate = React.useMemo(
      () => format(selectedDate, "yyyy-MM-dd"),
      [selectedDate],
    );
  const { data: schedule, isLoading: isSchedule } = useGetAllCommingSchedule(
    formattedDate,
  )

  const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

    useEffect(() => {
      const enforceZoomLevel = () => {
        const zoomLevel = Math.round(window.devicePixelRatio * 100);
  
        if (zoomLevel > 110) {
          document.body.style.transform = "scale(1)";
          document.body.style.transformOrigin = "0 0";
          console.log("Zoom level exceeded 110%. Resetting to 100%.");
        } else {
          document.body.style.transform = "none";
        }
  
        console.log(`Current Zoom Level: ${zoomLevel}%`);
      };
  
      enforceZoomLevel();
  
      window.addEventListener("resize", enforceZoomLevel);
  
      return () => {
        window.removeEventListener("resize", enforceZoomLevel);
      };
    }, []);

  return (
    <>
      <Container>
  <div className="flex justify-center gap-5">
    <div className="flex-1">
      <Box className="mb-5">
        <Text font={"bold"} size={"xl"}>
          {translate("Daily Exam", "examen quotidien", "الاختبار اليومية")}
        </Text>
        <Text color={"gray"} font={"semiBold"} size={"lg"} className="mt-2">
          {translate(
            "Ready to excel? Answer 10 questions daily and move closer to success!",
            "Prêt à exceller ? Répondez à 10 questions par jour et rapprochez-vous du succès !",
            "مستعد للتفوق؟ أجب على 10 أسئلة يوميًا واقترب من النجاح!"
          )}
        </Text>
        <Link href="/daily-plan" className="mt-2 font-semibold text-primary">
          {translate("Start", "Commencer", "ابدأ")}
        </Link>
      </Box>
      <Box className="mb-5">
        <Text font={"bold"} size={"xl"}>
          {translate("Upcoming Events", "Événements à venir", "الأحداث القادمة")}
        </Text>
        {isEvents ? (
          <div className="flex w-full justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {events?.data?.content.map((event: any) => {
              const { dayNumber, monthName, year, time } = formatDate(event.startDate);
              return (
                <React.Fragment key={event.id}>
                  <div className="mt-4 flex justify-between border-l-4 border-warning p-2 pl-4">
                    <div>
                      <Text font={"semiBold"} size={"lg"}>
                        {event.title}
                      </Text>
                      <Text color={"gray"} size={"lg"}>
                        {event.description}
                      </Text>
                    </div>
                    <div className="flex flex-col items-end">
                      <Text font={"semiBold"} size={"lg"}>
                        {time}
                      </Text>
                      <Text font={"semiBold"} size={"lg"}>
                        {dayNumber} {monthName}, {year}
                      </Text>
                    </div>
                  </div>
                  {event.attendees.map((img: any) => (
                    <div key={img.id} className="flex gap-2 items-center">
                      <Image src={img.picture} alt="Profile Photo" width={100} height={100} />
                      <Text font={"semiBold"} size={"lg"}>
                        {img.attendeeName}
                      </Text>
                    </div>
                  ))}
                  <hr className="mt-4" />
                </React.Fragment>
              );
            })}
          </>
        )}
      </Box>
      <Box className="mb-5">
      <Text font="bold" size="xl" className="text-white">           {translate("Daily Plan", "Plan quotidien", "الخطة اليومية")}         </Text>
      <div className="grid gap-6 p-4">
        
        {dailyPlans?.map((day: any, dayIndex: number) => (
          <div
            key={day.day}
            className="bg-bgPrimary rounded-lg shadow-md overflow-hidden border border-borderPrimary"
          >
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full p-4 flex items-center justify-between bg-primary text-white"
            >
              <Text font="bold" size="xl" className="text-white">
                {day.day}
              </Text>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-200 ${
                  openDays[day.day] ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            <div className={`transition-all duration-200 ${
              openDays[day.day] ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              <div className="divide-y divide-borderPrimary">
                {day.time_slots.map((slot: any, slotIndex: number) => (
                  <div
                    key={`${day.day}-${slotIndex}`}
                    className={`p-4 transition-colors ${
                      slot.courseName === "استراحة"
                        ? "bg-bgPrimary"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {slot.courseName === "استراحة" ? (
                          <Clock className="w-5 h-5 text-textSecondary" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-primary" />
                        )}
                        <div>
                          <h4 className="font-medium text-textSecondary">
                            {slot.courseName}
                          </h4>
                          {slot.courseName !== "استراحة" && (
                            <p className="text-sm text-textSecondary">
                              {slot.lessonName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-3 py-1 text-sm font-medium text-black bg-blue-100 rounded-full">
                          {slot.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
      <Box>
        <Text font={"bold"} size={"xl"}>
          {translate("Academic Progress", "Progrès académique", "التقدم الأكاديمي")}
        </Text>
        <Text color={"gray"} font={"semiBold"} size={"lg"}>
          {translate("This Semester", "Ce semestre", "هذا الفصل")}
        </Text>
        {isGpa || isAttendance ? (
          <div className="flex w-full justify-center">
            <Spinner />
          </div>
        ) : (
          <BoxGrid gap={4} className="py-4">
            <Box shadow="md">
              <Text font={"semiBold"} color={"gray"}>
                {translate("GPA", "Moyenne", "المعدل")}
              </Text>
              <Text className="flex gap-2 items-center" font={"semiBold"}>
                {gpa?.currentGpa}{" "}
                {gpa?.currentGpa >= 2.5 ? (
                  <IoTrendingUp className="text-green-500" />
                ) : (
                  <IoTrendingDown className="text-red-500" />
                )}
              </Text>
            </Box>
            <Box shadow="md">
              <Text font={"semiBold"} color={"gray"}>
                {translate("Attendance", "Présence", "الحضور")}
              </Text>
              <Text className="flex gap-2 items-center" font={"semiBold"}>
                {attendance?.currentAttendance}%{" "}
                {attendance?.currentAttendance >= 50 ? (
                  <IoTrendingUp className="text-green-500" />
                ) : (
                  <IoTrendingDown className="text-red-500" />
                )}
              </Text>
            </Box>
          </BoxGrid>
        )}
      </Box>
    </div>
    <div>
      <Box className="p-4 grid justify-center">
        <div className="m-10 mt-4 flex w-fit items-center justify-center shadow-lg">
          <CalendarDemo selectedDate={selectedDate} onDateSelect={handleDateSelect} />
        </div>
        {isSchedule ? (
          <div className="flex w-full justify-center">
            <Spinner />
          </div>
        ) : (
          <BoxGrid columns={1} gap={4}>
            {schedule?.data?.map((section: any) => (
              <Box key={section.id} border="borderPrimary" shadow="none">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <FaCircle size={25} className="text-primary" />
                    <Text>{section.courseName}</Text>
                    <Text>{section.teacherName}</Text>
                  </div>
                  <Text>
                    {section.startTime} - {section.endTime}
                  </Text>
                </div>
              </Box>
            ))}
          </BoxGrid>
        )}
        {schedule?.data?.length === 0 && (
          <Box border="borderPrimary" shadow="none">
            {translate("No Schedule Today", "Pas d'horaire aujourd'hui", "لا يوجد جدول اليوم")}
          </Box>
        )}
      </Box>
    </div>
  </div>
        <Box className="my-5">
          <div className="flex justify-between">
            <Text font={"bold"} size={"xl"}>
            {translate(
        "Student performance improvement",
        "Amélioration des performances des étudiants",
        "تحسين أداء الطلاب"
      )}
            </Text>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <FaCircle size={8} className="text-success" />
                <Text>GPA</Text>
              </div>
              <div className="flex items-center gap-1">
                <FaCircle size={8} className="text-softRed" />
                <Text>Attendance</Text>
              </div>
              <div className="flex items-center gap-1">
                <FaCircle size={8} className="text-warning" />
                <Text>Class Participation</Text>
              </div>
              <div className="flex items-center gap-1">
                <FaCircle size={8} className="text-lavender" />
                <Text>Student Behavior</Text>
              </div>
            </div>
          </div>
          <div className="text-center">
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="gpa"
                  type="monotone"
                  stroke="var(--color-gpa)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="attendance"
                  type="monotone"
                  stroke="var(--color-attendance)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="class"
                  type="monotone"
                  stroke="var(--color-class)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="behavior"
                  type="monotone"
                  stroke="var(--color-behavior)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </div>
            </div>
          </div>
        </Box>
        <Box>
          <Text font={"bold"} size={"xl"}>
          {translate(
        "Recent Academic Achievements",
        "Réalisations académiques récentes",
        "الإنجازات الأكاديمية الحديثة"
      )}
          </Text>
          <BoxGrid columns={6} className="m-4">
            <div className="w-fit rounded-xl border border-borderPrimary shadow-md">
              <Image
                src={"/images/achievements.png"}
                alt="Acheivment Photo"
                width={200}
                height={200}
              />
              <Text className="m-2" font={"semiBold"}>
                Science Fair Winner
              </Text>
              <Text className="m-2" font={"semiBold"} size={"lg"}>
                Grade 1
              </Text>
              <Image
                className="m-2"
                src={"/images/winner.png"}
                alt="Acheivment Photo"
                width={25}
                height={25}
              />
            </div>
            <div className="w-fit rounded-xl border border-borderPrimary shadow-md">
              <Image
                src={"/images/achievements.png"}
                alt="Acheivment Photo"
                width={200}
                height={200}
              />
              <Text className="m-2" font={"semiBold"}>
                Science Fair Winner
              </Text>
              <Text className="m-2" font={"semiBold"} size={"lg"}>
                Grade 1
              </Text>
              <Image
                className="m-2"
                src={"/images/winner.png"}
                alt="Acheivment Photo"
                width={25}
                height={25}
              />
            </div>
            <div className="w-fit rounded-xl border border-borderPrimary shadow-md">
              <Image
                src={"/images/achievements.png"}
                alt="Acheivment Photo"
                width={200}
                height={200}
              />
              <Text className="m-2" font={"semiBold"}>
                Science Fair Winner
              </Text>
              <Text className="m-2" font={"semiBold"} size={"lg"}>
                Grade 1
              </Text>
              <Image
                className="m-2"
                src={"/images/winner.png"}
                alt="Acheivment Photo"
                width={25}
                height={25}
              />
            </div>
          </BoxGrid>
        </Box>
      </Container>
    </>
  );
}
