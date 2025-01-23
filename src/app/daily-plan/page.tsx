"use client"

import Box from "~/_components/Box";
import Container from "~/_components/Container";
import { Text } from "~/_components/Text";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState, useEffect } from "react";
import Button from "~/_components/Button";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { toast } from "react-toastify";
import { useGetAllDailyExams, useGetAllQuestionsExams, useSendAnswer } from "~/APIs/hooks/useExam";
import Spinner from "~/_components/Spinner";

interface Answer {
  questionId: string;
  answer: string;
}

const DailyPlan = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [writtenAnswer, setWrittenAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const { data: exams, isLoading: isExamsLoading } = useGetAllDailyExams();
  const { data: questions, isLoading: isQuestionsLoading } = useGetAllQuestionsExams(selectedExamId ?? '');
  const { mutate: sendAnswers, isPending: isSending } = useSendAnswer();

  const handleExamChange = (examId: string) => {
    const selectedExam = exams?.data?.find((exam: any) => exam.id === examId);

    if (selectedExam?.completed) {
      toast.success("The exam has already been completed.");
      return;
    }

    setSelectedExamId(examId);
    setCurrentQuestion(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setWrittenAnswer("");
    setCorrectAnswer(null);
    setCorrectAnswersCount(0);
    setIsTestCompleted(false);
    setAnswers([]);
  };

  const handleAnswer = () => {
    if (!questions?.data) return;

    const currentQuestionData = questions.data[currentQuestion];
    const userAnswer = currentQuestionData.questionType === 'WRITTEN' ? writtenAnswer : selectedAnswer;
    
    if (!userAnswer) return;

    const isCorrect = currentQuestionData.questionType === 'WRITTEN' 
      ? userAnswer.toLowerCase().trim() === currentQuestionData.correctAnswer.toLowerCase().trim()
      : userAnswer === currentQuestionData.correctAnswer;

    setAnswers(prev => [...prev, {
      questionId: currentQuestionData.id.toString(),
      answer: userAnswer
    }]);

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    setCorrectAnswer(currentQuestionData.correctAnswer);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (!questions?.data) return;

    if (currentQuestion < questions.data.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setWrittenAnswer("");
      setCorrectAnswer(null);
    } else {
      setIsTestCompleted(true);
      if (selectedExamId) {
        sendAnswers(
          { courseId: selectedExamId, formData: answers },
          {
            onSuccess: () => {
              toast.success("Exam completed successfully!");
            },
            onError: (error) => {
              toast.error("Failed to submit exam answers. Please try again.");
            },
          }
        );
      }
    }
  };

  const handleStartNextExam = () => {
    if (!exams?.data) return;

    const nextExam = exams.data.find((exam: any) => !exam.completed);
    if (nextExam) {
      setSelectedExamId(nextExam.id);
      setCurrentQuestion(0);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setWrittenAnswer("");
      setCorrectAnswer(null);
      setCorrectAnswersCount(0);
      setIsTestCompleted(false);
      setAnswers([]);
    } else {
      toast.info("No more exams available.");
    }
  };

  const getQuestionOptions = (questionData: any) => {
    if (questionData.questionType === 'TF') {
      return ['صح', 'خطأ'];
    }
    return questionData.options;
  };

  const renderQuestionInput = (questionData: any) => {
    if (questionData.questionType === 'WRITTEN') {
      return (
        <div className="mb-20 flex flex-col gap-4">
          <textarea
            value={writtenAnswer}
            onChange={(e) => setWrittenAnswer(e.target.value)}
            disabled={isAnswered}
            className="w-full min-h-[120px] p-4 rounded-lg border-2 border-borderPrimary focus:border-primary focus:outline-none disabled:bg-bgSecondary"
            placeholder="Type your answer here..."
          />
          {isAnswered && (
            <div className="mt-4 p-4 rounded-lg bg-lightGray">
              <Text font="bold" size="lg" className="mb-2">
                Correct Answer:
              </Text>
              <Text size="md">{correctAnswer}</Text>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mb-20 flex flex-col gap-4">
        <RadioGroup.Root
          className="gap-4"
          aria-label="Answer Choices"
          value={selectedAnswer ?? ""}
          onValueChange={(value) => setSelectedAnswer(value)}
        >
          {getQuestionOptions(questionData).map((option: string, index: number) => (
            <RadioGroup.Item
              key={index}
              value={option}
              className={`group mt-4 flex h-16 w-full items-center gap-4 rounded-lg border-2 px-4 text-textPrimary transition focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 ${
                isAnswered
                  ? option === correctAnswer
                    ? "border-success"
                    : option === selectedAnswer
                      ? "border-error"
                      : "border-borderPrimary"
                  : "data-[state=checked]:border-primary"
              } ${isAnswered ? "cursor-not-allowed" : ""}`}
              disabled={isAnswered}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex gap-1">
                  <Text size={"md"}>{String.fromCharCode(65 + index)})</Text>
                  <Text size={"md"}>{option}</Text>
                </div>
                <div className="relative h-6 w-6">
                  {isAnswered ? (
                    option === correctAnswer ? (
                      <AiOutlineCheckCircle className="h-full w-full text-success" />
                    ) : option === selectedAnswer ? (
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
    );
  };

  if (isExamsLoading || isQuestionsLoading || isSending) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
      <Container>
        <Box>
          <Text font={"bold"} size={"2xl"}>
            Daily Plan
          </Text>
          <div className="flex flex-col md:flex-row w-full justify-start gap-8 rounded-xl bg-bgPrimary p-8">
            <div className="w-full md:w-1/5">
              {!exams?.data || exams.data.length === 0 ? (
                <div className="text-center p-4 bg-lightGray rounded-lg">
                  <Text color="gray" size="lg">There are no exams today</Text>
                </div>
              ) : (
                <RadioGroup.Root
                  className="gap-4"
                  value={selectedExamId || ""}
                  onValueChange={handleExamChange}
                  aria-label="Exam Selection"
                >
                  {exams.data.map((exam: any) => (
                    <RadioGroup.Item
                      key={exam.id}
                      value={exam.id}
                      className={`${exam.completed ? "cursor-not-allowed" : ""} group mt-1 flex h-20 w-full flex-col justify-center rounded-l-2xl rounded-r-2xl lg:rounded-r-none bg-lightGray px-4 text-center text-textPrimary transition hover:border-primary hover:text-primary focus-visible:ring focus-visible:ring-blue-200 focus-visible:ring-opacity-75 data-[state=checked]:border-primary data-[state=checked]:bg-primary`}
                      disabled={exam.completed}
                    >
                      <div className="flex w-full justify-between">
                        <span className="text-xl font-semibold group-data-[state=checked]:text-white">
                          {exam.courseName} 
                          <p className="font-medium text-sm">{exam.topicName}</p>
                        </span>
                        <div>
                          <p className={`${exam.completed ? "bg-success/5 text-success" : "bg-warning/5 text-warning"} rounded-xl p-2 font-bold group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary`}>
                            {exam.completed ? "completed" : "pending"}
                          </p>
                        </div>
                      </div>
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              )}
            </div>
    
            <div className="w-full md:w-4/5">
              {!selectedExamId ? (
                <div className="flex items-center justify-center h-full">
                  {!exams?.data || exams.data.length === 0 ? "" :
                    <Text color="gray" size="xl">Please select an exam to start</Text>
                  }
                </div>
              ) : isTestCompleted ? (
                <div className="text-center">
                  {questions?.data?.length && correctAnswersCount >= questions.data.length / 2 ? (
                    <div>
                      <div className="flex items-center justify-center">
                        <Image
                          src={"/images/congratulations.png"}
                          alt="congratulations"
                          width={400}
                          height={400}
                          className="ml-14"
                        />
                        <Text color={"success"} font={"bold"} size={"4xl"} className="absolute mb-10">
                          {correctAnswersCount}
                        </Text>
                        <Text font={"bold"} size={"4xl"} className="absolute mb-10 ml-20">
                          / {questions.data.length}
                        </Text>
                      </div>
                      <div className="ml-14 mt-10 flex justify-center">
                        <div className="w-fit">
                          <Button onClick={handleStartNextExam}>Start Next Exam</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex h-[200px] items-center justify-center">
                        <Text color={"error"} font={"bold"} size={"4xl"}>{correctAnswersCount} /</Text>
                        <Text font={"bold"} size={"4xl"} className="ml-3">{questions?.data?.length}</Text>
                      </div>
                      <div className="-mt-10">
                        <Text color={"primary"} font={"bold"} size={"4xl"}>Don&apos;t give up</Text>
                      </div>
                      <div>
                        <Text color={"gray"} font={"bold"} size={"2xl"}>Success requires more attempts</Text>
                      </div>
                      <div className="mt-10 flex justify-center">
                        <div className="w-fit">
                          <Button onClick={handleStartNextExam}>Start Next Exam</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {questions?.data && questions.data[currentQuestion] && (
                    <div className="flex flex-col gap-4">
                      <div className="rounded-xl border border-borderPrimary px-4 py-12">
                        <Text font={"bold"} size={"lg"}>
                          {currentQuestion + 1} - {questions.data[currentQuestion].question}
                        </Text>
                      </div>
                      {renderQuestionInput(questions.data[currentQuestion])}
                    </div>
                  )}
                  {isAnswered ? (
                    <Button onClick={handleNextQuestion}>Next Question</Button>
                  ) : (
                    <Button 
                      onClick={handleAnswer} 
                      disabled={questions?.data[currentQuestion].questionType === 'WRITTEN' 
                        ? !writtenAnswer.trim() 
                        : !selectedAnswer}
                    >
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