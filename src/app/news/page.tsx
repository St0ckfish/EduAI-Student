"use client"
import Image from "next/image";
import Box from "~/_components/Box";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllNews } from "~/APIs/hooks/useNews";
const News = () => {
  const {data, isLoading} = useGetAllNews();
  if(isLoading){
    return(
      <div className="flex w-full justify-center">
      <Spinner />
    </div>
    )
  }
  return (
    <>
      <Container>
        <Box>
          <Text font={"bold"} size={"2xl"}>
            News
          </Text>
          <div className="flex justify-center">
            <div className="w-1/2">
            {
              data.data.content.map((newsItem: any) => (
                <Box key={newsItem.id} border="borderPrimary" className="mb-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <Image
                        src={newsItem.publisherPicture}
                        alt="Profile Photo"
                        width={50}
                        height={50}
                        className="w-[60px] h-[60px] rounded-full"
                      />
                      <div className="flex flex-col">
                        <Text font={"semiBold"} size={"xl"}>
                          {newsItem.publisherName}
                        </Text>
                        <Text color={"gray"}>1h ago</Text>
                      </div>
                    </div>
                        <Text className="mt-4" font={"semiBold"} size={"xl"}>
                          {newsItem.title}
                        </Text>
                    <Text font={"medium"} size={"xl"} className="mt-4">
                      {newsItem.content}
                    </Text>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {
                        newsItem.attachments.map((img: any) => (
                          <Image
                          key={img.id}
                            src={img.viewLink}
                            alt="Profile Photo"
                            width={750}
                            height={750}
                          />
                        ))
                      }
                      
                    </div>
                  </div>
                </Box>
              ))
            }
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default News;
