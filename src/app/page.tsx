"use client";
import React from "react";
import Box from "~/_components/Box";
import BoxGrid from "~/_components/BoxGrid";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import { Calendar } from "~/components/ui/calendar";
import { FaCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import Link from "next/link";
import { useGetAttendance, useGetGpa, useGetUpCommingEvents } from "~/APIs/hooks/useHome";
import Spinner from "~/_components/Spinner";
import { formatDate } from "~/hooks/useFormatDate";
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
  function CalendarDemo() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-commentsCountmd flex w-full justify-center"
      />
    );
  }
  const { data: gpa, isLoading: isGpa } = useGetGpa()
  const { data: attendance, isLoading: isAttendance } = useGetAttendance()
  const { data: events, isLoading: isEvents } = useGetUpCommingEvents()
  return (
    <>
      <Container>
        <div className="flex justify-center gap-5">
          <div className="flex-1">
            <Box className="mb-5">
              <Text font={"bold"} size={"xl"}>
                Daily Plan
              </Text>
              <Text
                color={"gray"}
                font={"semiBold"}
                size={"lg"}
                className="mt-2"
              >
                Ready to excel? Answer 10 questions daily and move closer to
                success!
              </Text>
              <Link
                href="/daily-plan"
                className="mt-2 font-semibold text-primary"
              >
                Start
              </Link>
            </Box>
            <Box className="mb-5">
              <Text font={"bold"} size={"xl"}>
                Upcoming Events
              </Text>
              {
                isEvents ?
                  <div className="flex w-full justify-center">
                    <Spinner />
                  </div> :
                  <>
                    {
                      events?.data?.content.map((event: any) => {
                        const { dayNumber, monthName, year, time } = formatDate(event.startDate);

                        return (
                          <React.Fragment key={event.id}>
                            <div className="mt-4 flex justify-between border-l-4 border-warning p-2 pl-4">
                              <div>
                                <Text font={"semiBold"} size={"lg"}>
                                  {event.title}
                                </Text>
                                <Text color={"gray"} size={"lg"}>
                                  {event?.description}
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
                            {
                              event.attendees.map((img: any) => (
                                <div key={img.id} className="flex gap-2 items-center">
                                <Image
                                src={img.picture}
                                alt="Profile Photo"
                                width={100}
                                height={100}
                                />
                                  <Text font={"semiBold"} size={"lg"}>
                                  {img.attendeeName}
                                </Text>
                                </div>
                              ))
                            }
                            <hr className="mt-4" />
                          </React.Fragment>
                        );
                      })
                    }
                  </>
              }
            </Box>

            <Box>
              <Text font={"bold"} size={"xl"}>
                Academic Progress
              </Text>
              <Text color={"gray"} font={"semiBold"} size={"lg"}>
                This Semester
              </Text>
              {
                isGpa || isAttendance ?
                  <div className="flex w-full justify-center">
                    <Spinner />
                  </div> :
                  <BoxGrid gap={4} className="py-4">
                    <Box shadow="md">
                      <Text font={"semiBold"} color={"gray"}>
                        GPA
                      </Text>
                      <Text font={"semiBold"}>{gpa?.currentGpa}</Text>
                    </Box>
                    <Box shadow="md">
                      <Text font={"semiBold"} color={"gray"}>
                        Attendance
                      </Text>
                      <Text font={"semiBold"}>{attendance?.currentAttendance}%</Text>
                    </Box>
                  </BoxGrid>
              }
            </Box>
          </div>
          <div>
            <Box className="p-4">
              <div className="m-10 mt-4 flex w-fit items-center justify-center shadow-lg">
                <CalendarDemo />
              </div>
              <BoxGrid columns={1} gap={4}>
                <Box border="borderPrimary" shadow="none">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <FaCircle size={25} className="text-primary" />
                      <Text>Arabic Exam</Text>
                    </div>
                    <Text>8:00 am - 10:00 am</Text>
                  </div>
                </Box>
                <Box border="borderPrimary" shadow="none">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <FaCircle size={25} className="text-primary" />
                      <Text>Arabic Exam</Text>
                    </div>
                    <Text>8:00 am - 10:00 am</Text>
                  </div>
                </Box>
                <Box border="borderPrimary" shadow="none">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <FaCircle size={25} className="text-primary" />
                      <Text>Arabic Exam</Text>
                    </div>
                    <Text>8:00 am - 10:00 am</Text>
                  </div>
                </Box>
                <Box border="borderPrimary" shadow="none">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <FaCircle size={25} className="text-primary" />
                      <Text>Arabic Exam</Text>
                    </div>
                    <Text>8:00 am - 10:00 am</Text>
                  </div>
                </Box>
                <Box border="borderPrimary" shadow="none">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <FaCircle size={25} className="text-primary" />
                      <Text>Arabic Exam</Text>
                    </div>
                    <Text>8:00 am - 10:00 am</Text>
                  </div>
                </Box>
              </BoxGrid>
              <div className="mt-4 flex items-center justify-center">
                <Text font={"semiBold"} color={"primary"}>
                  Show More
                </Text>
                <MdKeyboardArrowDown className="text-primary" size={25} />
              </div>
            </Box>
          </div>
        </div>
        <Box className="my-5">
          <div className="flex justify-between">
            <Text font={"bold"} size={"xl"}>
              Student performance improvement
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
            Recent Academic Achievements
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
