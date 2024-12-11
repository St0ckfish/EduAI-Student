"use client";
import Box from "~/_components/Box";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useEffect, useState } from "react";
import {
  useGetMaterials,
  useGetSessionMaterials,
} from "~/APIs/hooks/useMaterial";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import Spinner from "~/_components/Spinner";
import { GrDocumentPdf } from "react-icons/gr";

const Materials = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; 
  console.log("🚀 ~ Materials ~ formattedDate:", formattedDate);

  const { data: dataMaterials } = useGetMaterials(formattedDate || ""); 
  console.log("🚀 ~ Materials ~ dataMaterials:", dataMaterials);

  const subjects = dataMaterials?.data?.content;
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [activeMaterialId, setActiveMaterialId] = useState<number | null>(null);

  useEffect(() => {
    if (subjects?.length) {
      setSelectedGrade(subjects[0]?.courseName || "");
    }
  }, [subjects]);

  const handleGradeChange = (gradeValue: string) => {
    setSelectedGrade(gradeValue);
  };

  // Get the selected subject data
  const selectedSubject = subjects?.find(
    (subject) => subject?.courseName === selectedGrade,
  );

  const selectedSessionId = selectedSubject?.sessionId;
  console.log("🚀 ~ Materials ~ selectedSessionId:", selectedSessionId);

  const {
    data: dataSessionMaterials,
    isLoading,
    error,
  } = useGetSessionMaterials(selectedSessionId?.toString() || "");
  console.log("🚀 ~ Materials ~ dataSessionMaterials:", dataSessionMaterials);

  // تغيير حالة إظهار المادة
  const toggleMaterialContent = (materialId: number) => {
    if (activeMaterialId === materialId) {
      setActiveMaterialId(null);
    } else {
      setActiveMaterialId(materialId);
    }
  };

  return (
    <Container>
      <Box>
        <Text font={"bold"} size={"2xl"}>
          Daily Plan
        </Text>
        <div className="flex w-full justify-start gap-8 rounded-xl bg-bgPrimary p-8">
          <div className="w-1/5">
            <RadioGroup.Root
              className="gap-4"
              value={selectedGrade}
              onValueChange={handleGradeChange}
              aria-label="Grade Selection"
            >
              {subjects?.map((subject) => {
                const startDate = new Date(`2024-12-10T${subject.startTime}`);
                const endDate = new Date(`2024-12-10T${subject.endTime}`);
                const diffInMilliseconds =
                  endDate.getTime() - startDate.getTime();
                const diffInDays = Math.ceil(
                  diffInMilliseconds / (1000 * 60 * 60 * 24),
                );

                return (
                  <RadioGroup.Item
                    key={subject.sessionId}
                    value={subject.courseName}
                    className="group mt-1 flex h-20 w-full flex-col justify-center rounded-l-2xl bg-lightGray px-4 text-center text-textPrimary transition hover:border-primary hover:text-primary focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    aria-labelledby={`${subject.courseName}-label`}
                  >
                    <div
                      id={`${subject.courseName}-label`}
                      className="text-xl font-bold group-data-[state=checked]:text-white"
                    >
                      {subject.courseName}
                    </div>
                    <p className="text-lg font-semibold text-textPrimary group-data-[state=checked]:text-white">
                      Durations: {diffInDays} days
                    </p>
                  </RadioGroup.Item>
                );
              })}
            </RadioGroup.Root>
          </div>

          <div className="w-4/5">
            {/* Display the selected subject's materials */}
            {error && <p>Error loading materials: {error.message}</p>}
            {dataSessionMaterials?.data?.length ? (
              dataSessionMaterials.data.map((material, index) => (
                <div key={material.materialId} className="mb-4">
                  <div
                    className="mb-4 flex cursor-pointer items-center justify-between border-b border-borderPrimary/50"
                    onClick={() => toggleMaterialContent(material.materialId)}
                  >
                    <Text font={"semiBold"} size={"xl"} className="mb-4">
                      {index + 1}- {material?.title}
                    </Text>
                    {activeMaterialId === material.materialId ? (
                      <GoChevronRight size={20} />
                    ) : (
                      <GoChevronDown size={20} />
                    )}
                  </div>

                  {activeMaterialId === material.materialId && (
                    <div className="gap-2">
                      <Text font={"semiBold"} size={"lg"} className="mb-4">{material.description}</Text>
                      <a
                        href={material.fileLink || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-1/4 items-center justify-start gap-3 rounded-lg border border-borderPrimary bg-bgPrimary p-3 text-textPrimary transition hover:bg-bgSecondary"
                      >
                        <GrDocumentPdf size={25} />
                        Download file
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : isLoading ? (
              <Spinner />
            ) : (
              <Text font={"semiBold"} size={"xl"}>No materials available for this session.</Text>
            )}
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Materials;
