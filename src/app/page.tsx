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
              <Text
                color={"primary"}
                font={"semiBold"}
                size={"lg"}
                className="mt-2"
              >
                Start
              </Text>
            </Box>
            <Box className="mb-5">
              <Text font={"bold"} size={"xl"}>
                Upcoming Events
              </Text>
              <div className="mt-4 flex justify-between border-l-4 border-warning p-2 pl-4">
                <div>
                  <Text font={"semiBold"} size={"lg"}>
                    Art Day
                  </Text>
                  <Text color={"gray"} size={"lg"}>
                    Tomorrow
                  </Text>
                </div>
                <div className="flex flex-col items-end">
                  <Text font={"semiBold"} size={"lg"}>
                    2:00 PM
                  </Text>
                  <Text font={"semiBold"} size={"lg"}>
                    21 may,2024
                  </Text>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-l-4 border-success p-2 pl-4">
                <div>
                  <Text font={"semiBold"} size={"lg"}>
                    Art Day
                  </Text>
                  <Text color={"gray"} size={"lg"}>
                    Tomorrow
                  </Text>
                </div>
                <div className="flex flex-col items-end">
                  <Text font={"semiBold"} size={"lg"}>
                    2:00 PM
                  </Text>
                  <Text font={"semiBold"} size={"lg"}>
                    21 may,2024
                  </Text>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-l-4 border-warning p-2 pl-4">
                <div>
                  <Text font={"semiBold"} size={"lg"}>
                    Art Day
                  </Text>
                  <Text color={"gray"} size={"lg"}>
                    Tomorrow
                  </Text>
                </div>
                <div className="flex flex-col items-end">
                  <Text font={"semiBold"} size={"lg"}>
                    2:00 PM
                  </Text>
                  <Text font={"semiBold"} size={"lg"}>
                    21 may,2024
                  </Text>
                </div>
              </div>
            </Box>
            <Box>
              <Text font={"bold"} size={"xl"}>
                Academic Progress
              </Text>
              <Text color={"gray"} font={"semiBold"} size={"lg"}>
                This Semester
              </Text>
              <BoxGrid gap={4} className="py-4">
                <Box shadow="md">
                  <Text font={"semiBold"} color={"gray"}>
                    GPA
                  </Text>
                  <Text font={"semiBold"}>5.8</Text>
                  <Text font={"semiBold"} color={"success"}>
                    +1.3
                  </Text>
                </Box>
                <Box shadow="md">
                  <Text font={"semiBold"} color={"gray"}>
                    Attendance
                  </Text>
                  <Text font={"semiBold"}>84%</Text>
                  <Text font={"semiBold"} color={"error"}>
                    -3%
                  </Text>
                </Box>
                <Box shadow="md">
                  <Text font={"semiBold"} color={"gray"}>
                    Class Participation
                  </Text>
                  <Text font={"semiBold"}>Good</Text>
                  <Text font={"semiBold"} color={"success"}>
                    +4
                  </Text>
                </Box>
                <Box shadow="md">
                  <Text font={"semiBold"} color={"gray"}>
                    Student Behavior
                  </Text>
                  <Text font={"semiBold"}>Good</Text>
                  <Text font={"semiBold"} color={"success"}>
                    +3
                  </Text>
                </Box>
              </BoxGrid>
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
                <FaCircle size={8} className="text-lavender" />p
                <Text>Student Behavior</Text>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Text font={"bold"} size={"4xl"} className="mt-10">
              Chart
            </Text>
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
