"use client";
import Image from "next/image";
import Container from "~/_components/Container";
import Input from "~/_components/Input";
import Spinner from "~/_components/Spinner";
import { Text } from "~/_components/Text";
import {
  useGetProfileUpdate,
  useProfile,
  useUpdateProfile,
} from "~/APIs/hooks/useProfile";
import { useGetAllNationalities } from "~/APIs/hooks/useAuth";
import { useState, useEffect } from "react";
import { type StudentProfileUpdate } from "~/types";
import Button from "~/_components/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditProfile = () => {
  const router = useRouter();
  const { data, isLoading, refetch: refetchProfile } = useProfile();
  console.log("👾 ~ EditProfile ~ data:", data);
  const {
    data: dataUpdate,
    isLoading: isLoadingdataUpdate,
    refetch: refetchDataUpdate,
  } = useGetProfileUpdate();
  console.log("dataUpdate", dataUpdate);

  const [name, setName] = useState(""); // Initialize state as empty
  const [phone, setPhone] = useState(""); // Initialize state as empty
  console.log("phone", phone);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE"); // Initialize state as empty
  const [nationality, setNationality] = useState(""); // Initialize state as empty
  const [qualification, setQualification] = useState(""); // Initialize state as empty
  const [subject, setSubject] = useState(""); // Initialize state as empty

  const { data: nationalityData, isLoading: isNationalities } =
    useGetAllNationalities() as {
      data: Record<string, string>;
      isLoading: boolean;
    };

  // const optionsNationalities = nationalityData?.data
  //   ? Object.entries(nationalityData.data).map(([key, value]) => ({
  //       value: key,
  //       label: `${value}`,
  //     }))
  //   : [];

  // Set initial values for inputs once data is loaded
  useEffect(() => {
    if (data?.data) {
      setName(data.data.name || "");
      setPhone(dataUpdate?.data.phone || "");
      setGender(
        dataUpdate?.data.gender === "MALE"
          ? "MALE"
          : dataUpdate?.data.gender === "FEMALE"
            ? "FEMALE"
            : "MALE",
      );
      setNationality(dataUpdate?.data.nationality || "");
      setQualification(data.data.qualification || "");
      // setSubject(data.data.subjects[0] || "");
    }
  }, [data]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.target.value === "MALE" ? setGender("MALE") : setGender("FEMALE");
  };

  // const {data: dataSubjects} = useGetAllTextBookSummarys();
  // console.log(dataSubjects);
  const { mutate: updateProfileMutation } = useUpdateProfile({
    onSuccess: () => {
      router.push("/"); // Navigate to home page on success
      toast.success("Profile Edited successfully!");
    },
  });
  const handleSubmit = () => {
    const updatedProfile: StudentProfileUpdate = {
      username: dataUpdate?.data?.username || "",
      email: dataUpdate?.data?.email || "",
      name_ar: name,
      name_en: name,
      name_fr: name,
      // phone: phone,
      gender,
      nationality: dataUpdate?.data?.nationality || "",
      birthDate: dataUpdate?.data?.birthDate || "",
      nid: dataUpdate?.data?.nid || "",
      religion: dataUpdate?.data?.religion || "", // enum  : /api/v1/public/enumeration/religion
      regionId: dataUpdate?.data?.regionId || "",
      about: dataUpdate?.data?.about || "",
      countryCode: "AU",
    };
    console.log("updatedProfile", updatedProfile);
    updateProfileMutation(updatedProfile);
    refetchDataUpdate();
    refetchProfile();
  };

  if (isLoading || isNationalities || isLoadingdataUpdate) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <div className="w-full overflow-x-hidden rounded-xl bg-bgPrimary p-4">
          <Text font={"bold"} size={"4xl"}>
            Edit Profile
          </Text>
          <div className="mt-4 flex flex-col items-center">
            <div>
              <Image
                priority
                unoptimized
                src={data?.data?.picture || "/images/userr.png"}
                alt="Profile Photo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-center">
              <Text font={"bold"} size={"2xl"} className="mt-2">
                {data?.data?.name}
              </Text>
              <Text size={"xl"} color="gray" className="mb-2">
                @{data?.data?.username}
              </Text>
          </div>
          <div className="m-auto w-4/5">
            <div className="flex gap-8">
              <div>
                <a href="/profile" className="text-xl text-primary underline">
                  Personal Info.
                </a>
              </div>
              <div>
                <a href="/password" className="text-xl">
                  Change Password{" "}
                </a>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name">Name</label>
                <Input
                  name="name"
                  placeholder="Enter name"
                  theme="transparent"
                  border="gray"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  className="w-full rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary outline-none transition duration-200 ease-in"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="mt-4 w-[150px]">
              <Button
                className="rounded-lg bg-primary px-6 py-2 text-white"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
        </div>
      </Container>
    </>
  );
};

export default EditProfile;
