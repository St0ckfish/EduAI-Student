"use client";
import Box from "~/_components/Box";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import Button from "~/_components/Button";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { toast } from "react-toastify";
import { useGetAllDailyExams } from "~/APIs/hooks/useExam";
import Spinner from "~/_components/Spinner";

const DailyPlan = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

  const handleGradeChange = (gradeValue: string) => {
    const selectedPlan = plans.find((plan) => plan.value === gradeValue);

    // Check if the selected plan's status is 'completed'
    if (selectedPlan?.status === "completed") {
      toast.success("The exam has already been completed.");
      return;
    }

    // If not completed, proceed with setting the grade and resetting the state
    setSelectedGrade(gradeValue);
    setCurrentQuestion(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setCorrectAnswersCount(0);
    setIsTestCompleted(false);
  };

  const handleAnswer = () => {
    const correctChoice = selectedSubject?.Questions[
      currentQuestion
    ]?.choices.find((choice) => choice.isRightAnswer);

    if (correctChoice?.id.toString() === selectedAnswer) {
      setCorrectAnswersCount((prev) => prev + 1); // Increment correct answers count
    }

    setCorrectAnswer(correctChoice?.id.toString() || null);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (selectedSubject?.Questions.length || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null); // Reset selected answer
      setCorrectAnswer(null);
    } else {
      setIsTestCompleted(true); // Mark test as completed
    }
  };

  const {data: exams, isLoading: isExams} = useGetAllDailyExams()

  const handleStartNextExam = () => {
    // Find the next exam with the status "pending"
    const nextExam = plans.find((plan) => plan.status === "pending");

    if (nextExam) {
      // If an available exam is found, update the state
      setSelectedGrade(nextExam.value); // Set the next exam as selected
      setCurrentQuestion(0); // Start from the first question
      setIsAnswered(false); // Reset answered state
      setSelectedAnswer(null); // Clear selected answer
      setCorrectAnswer(null); // Clear correct answer
      setCorrectAnswersCount(0); // Reset correct answers count
      setIsTestCompleted(false); // Mark the test as not completed
    } else {
      toast.info("No more exams available.");
    }
  };

  const plans = [
    {
      value: "mathematics",
      label: "Mathematics",
      status: "completed",
      Questions: [
        {
          question: "What is 2 + 2?",
          id: 1,
          choices: [
            { id: 1, number: "A)", text: "3", isRightAnswer: false },
            { id: 2, number: "B)", text: "4", isRightAnswer: true },
            { id: 3, number: "C)", text: "5", isRightAnswer: false },
            { id: 4, number: "D)", text: "6", isRightAnswer: false },
          ],
        },
        {
          question: "What is 9 x 3?",
          id: 2,
          choices: [
            { id: 1, number: "A)", text: "27", isRightAnswer: true },
            { id: 2, number: "B)", text: "18", isRightAnswer: false },
            { id: 3, number: "C)", text: "36", isRightAnswer: false },
            { id: 4, number: "D)", text: "21", isRightAnswer: false },
          ],
        },
        {
          question: "What is the square root of 81?",
          id: 3,
          choices: [
            { id: 1, number: "A)", text: "8", isRightAnswer: false },
            { id: 2, number: "B)", text: "9", isRightAnswer: true },
            { id: 3, number: "C)", text: "7", isRightAnswer: false },
            { id: 4, number: "D)", text: "10", isRightAnswer: false },
          ],
        },
      ],
    },
    {
      value: "english",
      label: "English",
      status: "pending",
      Questions: [
        {
          question: "What is the synonym of 'Happy'?",
          id: 1,
          choices: [
            { id: 1, number: "A)", text: "Sad", isRightAnswer: false },
            { id: 2, number: "A)", text: "Elated", isRightAnswer: true },
            { id: 3, number: "A)", text: "Angry", isRightAnswer: false },
            { id: 4, number: "A)", text: "Bored", isRightAnswer: false },
          ],
        },
        {
          question: "What is the past tense of 'Run'?",
          id: 2,
          choices: [
            { id: 1, number: "A)", text: "Running", isRightAnswer: false },
            { id: 2, number: "A)", text: "Ran", isRightAnswer: true },
            { id: 3, number: "A)", text: "Runs", isRightAnswer: false },
            { id: 4, number: "A)", text: "Runed", isRightAnswer: false },
          ],
        },
      ],
    },
    {
      value: "history",
      label: "History",
      status: "pending",
      Questions: [
        {
          question: "Who discovered America?",
          id: 1,
          choices: [
            {
              id: 1,
              number: "A)",
              text: "Christopher Columbus",
              isRightAnswer: true,
            },
            {
              id: 2,
              number: "A)",
              text: "Albert Einstein",
              isRightAnswer: false,
            },
            { id: 3, number: "A)", text: "Isaac Newton", isRightAnswer: false },
            { id: 4, number: "A)", text: "Napoleon", isRightAnswer: false },
          ],
        },
        {
          question: "In which year did World War II end?",
          id: 2,
          choices: [
            { id: 1, number: "A)", text: "1940", isRightAnswer: false },
            { id: 2, number: "A)", text: "1945", isRightAnswer: true },
            { id: 3, number: "A)", text: "1950", isRightAnswer: false },
            { id: 4, number: "A)", text: "1939", isRightAnswer: false },
          ],
        },
      ],
    },
    {
      value: "french",
      label: "French",
      status: "pending",
      Questions: [
        {
          question: "What is the French word for 'Apple'?",
          id: 1,
          choices: [
            { id: 1, number: "A)", text: "Pomme", isRightAnswer: true },
            { id: 2, number: "A)", text: "Banane", isRightAnswer: false },
            { id: 3, number: "A)", text: "Orange", isRightAnswer: false },
            { id: 4, number: "A)", text: "Fraise", isRightAnswer: false },
          ],
        },
        {
          question: "How do you say 'Good Morning' in French?",
          id: 2,
          choices: [
            { id: 1, number: "A)", text: "Bonsoir", isRightAnswer: false },
            { id: 2, number: "A)", text: "Bonjour", isRightAnswer: true },
            { id: 3, number: "A)", text: "Salut", isRightAnswer: false },
            { id: 4, number: "A)", text: "Merci", isRightAnswer: false },
          ],
        },
      ],
    },
  ];

  const [selectedGrade, setSelectedGrade] = useState<any>(() => {
    const availablePlans = plans.filter((plan) => plan.status !== "completed");
    return availablePlans.length > 0 ? availablePlans[0]?.value : "";
  });

  const selectedSubject = plans.find((plan) => plan.value === selectedGrade);

  return (
    <Container>
      <Box>
        <Text font={"bold"} size={"2xl"}>
          Daily Plan
        </Text>
        <div className="flex w-full justify-start gap-8 rounded-xl bg-bgPrimary p-8">
          <div className="w-1/5">
          {
            isExams ? <div className="flex w-full justify-center">
            <Spinner />
          </div> :
            <RadioGroup.Root
              className="gap-4"
              value={selectedGrade}
              onValueChange={handleGradeChange}
              aria-label="Grade Selection"
            >
              {exams?.data?.map((exam:any) => (
                <RadioGroup.Item
                  key={exam.id}
                  value={exam.id}
                  className={`${exam.completed === true ? "cursor-not-allowed" : ""} group mt-1 flex h-20 w-full flex-col justify-center rounded-l-2xl bg-lightGray px-4 text-center text-textPrimary transition hover:border-primary hover:text-primary focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 data-[state=checked]:border-primary data-[state=checked]:bg-primary`}
                  aria-labelledby={`${exam.id}-label`}
                  disabled={status === "completed"} // Disable the item if completed
                >
                  <div className="flex w-full justify-between">
                    <span
                      id={`${exam.id}-label`}
                      className="text-xl font-semibold group-data-[state=checked]:text-white"
                    >
                      {exam.courseName} <p className="font-medium text-sm">{exam.topicName}</p>
                    </span>
                    <div className="">
                      <p
                        className={`${exam.completed === true ? "bg-success/5 text-success" : "bg-warning/5 text-warning"} rounded-xl p-2 font-bold group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary`}
                      >
                        {exam.completed === true ? "completed" : "pending"}
                      </p>
                    </div>
                  </div>
                    
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          }
          </div>

          <div className="w-4/5">
            {isTestCompleted ? (
              <div className="text-center">
                {selectedSubject?.Questions?.length &&
                correctAnswersCount >= selectedSubject?.Questions.length / 2 ? (
                  <div>
                    <div className="flex items-center justify-center">
                      <Image
                        src={"/images/congratulations.png"}
                        alt="congratulations"
                        width={400}
                        height={400}
                        className="ml-14"
                      />
                      <Text
                        color={"success"}
                        font={"bold"}
                        size={"4xl"}
                        className="absolute mb-10"
                      >
                        {correctAnswersCount} {""}
                      </Text>
                      <Text
                        font={"bold"}
                        size={"4xl"}
                        className="absolute mb-10 ml-20"
                      >
                        / {selectedSubject?.Questions.length}
                      </Text>
                    </div>
                    <div className="ml-14 mt-10 flex justify-center">
                      <div className="w-fit">
                        <Button onClick={handleStartNextExam}>
                          Start Next Exam
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex h-[200px] items-center justify-center">
                      <Text color={"error"} font={"bold"} size={"4xl"}>
                        {correctAnswersCount} /
                      </Text>
                      <Text font={"bold"} size={"4xl"} className="ml-3">
                        {selectedSubject?.Questions.length}
                      </Text>
                    </div>
                    <div className="-mt-10">
                      <Text color={"primary"} font={"bold"} size={"4xl"}>
                        Don&apos;t give up
                      </Text>
                    </div>
                    <div>
                      <Text color={"gray"} font={"bold"} size={"2xl"}>
                        Success requires more attempts
                      </Text>
                    </div>
                    <div className="mt-10 flex justify-center">
                      <div className="w-fit">
                        <Button onClick={handleStartNextExam}>
                          Start Next Exam
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {selectedSubject && (
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-borderPrimary px-4 py-12">
                      <Text font={"bold"} size={"lg"}>
                        {currentQuestion + 1} -{" "}
                        {selectedSubject.Questions[currentQuestion]?.question}
                      </Text>
                    </div>

                    <div className="mb-20 flex flex-col gap-4">
                      <RadioGroup.Root
                        className="gap-4"
                        aria-label="Answer Choices"
                        value={selectedAnswer ?? ""} // Bind value to reset on question change
                        onValueChange={(value) => setSelectedAnswer(value)} // Update selectedAnswer on change
                      >
                        {selectedSubject.Questions[
                          currentQuestion
                        ]?.choices.map((choice) => (
                          <RadioGroup.Item
                            key={choice.id}
                            value={choice.id.toString()}
                            className={`group mt-4 flex h-16 w-full items-center gap-4 rounded-lg border-2 px-4 text-textPrimary transition focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 ${
                              isAnswered
                                ? choice.id.toString() === correctAnswer
                                  ? "border-success"
                                  : choice.id.toString() === selectedAnswer
                                    ? "border-error"
                                    : "border-borderPrimary"
                                : "data-[state=checked]:border-primary"
                            } ${isAnswered ? "cursor-not-allowed" : ""}`}
                            onClick={() =>
                              !isAnswered &&
                              setSelectedAnswer(choice.id.toString())
                            }
                            disabled={isAnswered}
                          >
                            <div className="flex w-full items-center justify-between">
                              <div className="flex gap-1">
                                <Text size={"md"}>{choice.number}</Text>
                                <Text size={"md"}>{choice.text}</Text>
                              </div>
                              <div className="relative h-6 w-6">
                                {isAnswered ? (
                                  choice.id.toString() === correctAnswer ? (
                                    <AiOutlineCheckCircle className="h-full w-full text-success" />
                                  ) : choice.id.toString() ===
                                    selectedAnswer ? (
                                    <AiOutlineCloseCircle className="h-full w-full text-error" />
                                  ) : null
                                ) : (
                                  <div className="h-full w-full rounded-full border-2 border-borderPrimary group-data-[state=checked]:border-primary"></div>
                                )}
                              </div>
                            </div>
                          </RadioGroup.Item>
                        ))}
                      </RadioGroup.Root>
                    </div>
                  </div>
                )}
                {isAnswered ? (
                  <Button onClick={handleNextQuestion}>Next Question</Button>
                ) : (
                  <Button onClick={handleAnswer} disabled={!selectedAnswer}>
                    Answer
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default DailyPlan;
