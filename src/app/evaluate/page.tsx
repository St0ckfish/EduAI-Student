/* eslint-disable @next/next/no-img-element */
import Box from "~/_components/Box";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "~/components/ui/select";
const Evaluate = () => {
    return ( 
        <Container>
            <Box>
                <Text font={"bold"} size={"2xl"}>
                Evaluate Teachers
                </Text>
                <div className="flex w-full items-center justify-between gap-10 mt-10">
        {/* Academic Year Select */}
        <Select 
          value=""
        >
          <SelectTrigger className={`w-full border bg-bgPrimary border-borderPrimary`}>
            <SelectValue placeholder="Select Teacher" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="ede">
          SelectItem
          </SelectItem>
          </SelectContent>
        </Select>

        {/* Semester Select */}
        <Select 
          value=""
        >
          <SelectTrigger className={`w-full border bg-bgPrimary border-borderPrimary`}>
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="ede">
          SelectItem
          </SelectItem>
          </SelectContent>
        </Select>

        {/* Student Select */}
      </div>
      <div className="flex w-full justify-center mt-20">
        <img src="/images/cuate.png" alt="#" />
      </div>
            </Box>
        </Container>
     );
}
 
export default Evaluate;