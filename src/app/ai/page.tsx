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

const AI = () => {
    const subjects = [
        {name: "Mathematics", icon: <TbMath className="text-xl" />, link: "/" },
        {name: "English", icon: <FaLanguage className="text-xl" />, link: "/" },
        {name: "Science", icon: <MdOutlineScience className="text-xl" />, link: "/" },
        {name: "History", icon: <GiPapers className="text-xl" />, link: "/" },
        {name: "Chemistry", icon: <SlChemistry className="text-xl" />, link: "/" },
        {name: "Geography", icon: <IoEarthSharp className="text-xl" />, link: "/" },
        {name: "Biology", icon: <GiDna2 className="text-xl" />, link: "/" },
        {name: "Physics", icon: <SiElectron className="text-xl" />, link: "/" },
        {name: "Arabic", icon: <FaLanguage className="text-xl" />, link: "/" },
        {name: "French", icon: <FaLanguage className="text-xl" />, link: "/" },
    ]
    return ( 
        <Container>
            <Box>
                <Text font={"bold"} size={"2xl"}>
                AI Assistant
                </Text>
                <Text font={"medium"} size={"2xl"} className="flex items-center gap-2 mt-20">
                <Image src="/images/ai.svg" alt="#" width={50} height={50}/> Hello! How can I assist you today? 👋🏻
                </Text>
                    <div className="grid gap-4 grid-cols-4 mt-10">
                        {
                            subjects.map((subject) => (
                                <Link key={subject.name} href={subject.link} className="w-[250px] h-[105px]">
                                <div  className="bg-thead rounded-3xl grid gap-2 p-3 w-[250px] h-[105px]">
                                    <div className="flex w-full justify-between items-center">
                                        <div className="p-2 rounded-full bg-bgPrimary">{subject.icon}</div>
                                        <GoArrowUpRight className="text-2xl" />
                                    </div>
                                    <div>
                                    <Text font={"medium"} size={"xl"}>
                                        {subject.name}
                                    </Text>
                                    </div>
                                </div>
                                </Link>
                            ))
                        }
                    </div>
            </Box>
        </Container>
     );
}
 
export default AI;