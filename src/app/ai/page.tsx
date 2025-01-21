"use client";
import Image from "next/image";
import Box from "~/_components/Box";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import { TbMath } from "react-icons/tb";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineScience } from "react-icons/md";
import { GiPapers } from "react-icons/gi";
import { SlChemistry } from "react-icons/sl";
import { IoEarthSharp } from "react-icons/io5";
import { GiDna2 } from "react-icons/gi";
import { SiElectron } from "react-icons/si";
import { FaLanguage } from "react-icons/fa";
import Link from "next/link";
import { useGetAllStudentSubjects } from "~/APIs/hooks/useMaterial";
import Spinner from "~/_components/Spinner";
import useLanguageStore, { useCourseStore } from "~/APIs/store";

const AI = () => {
  const { data, isLoading } = useGetAllStudentSubjects();

  const iconMap = {
    Mathematics: <TbMath className="text-xl" />, 
    English: <FaLanguage className="text-xl" />, 
    Science: <MdOutlineScience className="text-xl" />, 
    History: <GiPapers className="text-xl" />, 
    Chemistry: <SlChemistry className="text-xl" />, 
    Geography: <IoEarthSharp className="text-xl" />, 
    Biology: <GiDna2 className="text-xl" />, 
    Physics: <SiElectron className="text-xl" />, 
    Arabic: <FaLanguage className="text-xl" />, 
    French: <FaLanguage className="text-xl" />, 
    "Arabic Term 1 (Science)": <MdOutlineScience className="text-xl" />,
    "Philosophy Term 1": <MdOutlineScience className="text-xl" />
  };

  const defaultIcon = <GiPapers className="text-xl" />;
  const { setCourseRegistrationId } = useCourseStore();
  
  const storeInLocalStorage = (id: string) => {
    setCourseRegistrationId(id); // Assuming you're using the Zustand store
}

const language = useLanguageStore((state) => state.language);
  const translate = (en: string, fr: string, ar: string) => {
    return language === "fr" ? fr : language === "ar" ? ar : en;
  };

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <Container>
      <Box>
      <Text font={"bold"} size={"2xl"}>
  {translate("AI Assistant", "Assistant IA", "المساعد الذكي")}
</Text>
        <Text
          font={"medium"}
          size={"2xl"}
          className="flex flex-col items-center gap-4 mt-10 sm:flex-row sm:gap-2 sm:items-start"
        >
          <Image src="/images/ai.svg" alt="#" width={50} height={50} />
          {translate("Hello! How can I assist you today? 👋🏻", "Bonjour ! Comment puis-je vous aider aujourd'hui ? 👋🏻", "مرحبًا! كيف يمكنني مساعدتك اليوم؟ 👋🏻")}        </Text>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {data?.map((subject: { courseId: string; id: string; courseName: string  }) => (
            <Link
            onClick={()=> storeInLocalStorage(subject.id)}
              key={subject.id}
              href={`/ai/${subject.courseId}`}
              className="w-full max-w-[250px] h-[105px] mx-auto"
            >
              <div className="bg-thead rounded-3xl grid gap-2 p-3 w-full h-full">
                <div className="flex w-full justify-between items-center">
                  <div className="p-2 rounded-full bg-bgPrimary">
                    {iconMap[subject.courseName as keyof typeof iconMap] || defaultIcon}
                  </div>
                  <GoArrowUpRight className="text-2xl" />
                </div>
                <div>
                  <Text font={"medium"} size={"xl"}>
                    {subject.courseName}
                  </Text>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Box>
    </Container>
  );
};

export default AI;
