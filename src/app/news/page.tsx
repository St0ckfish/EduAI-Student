import Image from "next/image";
import Box from "~/_components/Box";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";

const News = () => {
  return (
    <>
      <Container>
        <Box>
          <Text font={"bold"} size={"2xl"}>
            News
          </Text>
          <div className="flex justify-center">
            <div className="w-1/2">
              <Box border="borderPrimary" className="mb-10">
                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/Avatar.png"}
                      alt="Profile Photo"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col">
                      <Text font={"semiBold"} size={"xl"}>
                        Admin
                      </Text>
                      <Text color={"gray"}>1h ago</Text>
                    </div>
                  </div>
                  <Text font={"medium"} size={"xl"} className="mt-4">
                    Lorem ipsum dolor sit amet consectetur. Morbi aenean ut
                    ipsum sed integer quis nunc. Augue nulla laoreet mattis
                    enim.
                  </Text>
                </div>
              </Box>
              <Box border="borderPrimary" className="mb-10">
                <div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/Avatar.png"}
                      alt="Profile Photo"
                      width={50}
                      height={50}
                    />
                    <div className="flex flex-col">
                      <Text font={"semiBold"} size={"xl"}>
                        Admin
                      </Text>
                      <Text color={"gray"}>1h ago</Text>
                    </div>
                  </div>
                  <Text font={"medium"} size={"xl"} className="mt-4">
                    Lorem ipsum dolor sit amet consectetur. Morbi aenean ut
                    ipsum sed integer quis nunc. Augue nulla laoreet mattis
                    enim.
                  </Text>
                  <div className="mt-4">
                    <Image
                      src={"/images/exam.png"}
                      alt="Profile Photo"
                      width={750}
                      height={750}
                    />
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default News;
