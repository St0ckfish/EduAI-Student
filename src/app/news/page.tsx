"use client"
import Image from "next/image";
import { FaHeart, FaPaperPlane, FaRegComment, FaRegHeart } from "react-icons/fa";
import Box from "~/_components/Box";
import Container from "~/_components/Container";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import { useGetAllNews, useLikePost } from "~/APIs/hooks/useNews";
const News = () => {
  const {data, isLoading, refetch} = useGetAllNews();
  const { mutate: likePost } = useLikePost();

  const handleLikeClick = (postId: number, liked: boolean) => {
    likePost(
      { postId, liked },
      {
        onSuccess: () => {
          void refetch(); // Only refetch posts after successful like/unlike mutation
        },
      },
    );
  };
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
                  <hr className="mt-7" />
                    <div className="flex gap-3 mt-2">
                  <button
                    className="flex items-center gap-1"
                  >
                    {newsItem?.isLiked ? (
                      <FaHeart
                        color="red"
                        size={20}
                        onClick={() => handleLikeClick(newsItem.id, false)}
                      />
                    ) : (
                      <FaRegHeart
                        size={20}
                        onClick={() => handleLikeClick(newsItem.id, true)}
                      />
                    )}

                    <Text size={"xs"}>{newsItem?.likesCount}</Text>
                  </button>
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
