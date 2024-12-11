// src/types/advice.ts

export type Advice = {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export type PaginatedAdvices = {
    advices: Advice[];
    total: number;
    page: number;
    limit: number;
  }
  
  export type SignUpFormData = {
    username: string;
    email: string;
    schoolId: string;
    regionId: string;
    name_en: string;
    name_fr: string;
    name_ar: string;
    subjects: string[];
    qualification: string;
    password: string;
    about?: string;
    nationality: string;
    gender: string;
    nid: string;
    birthDate: string;
    countryCode: string;
    number: string;
  }
  export type ExamFormData = {
    name: string;
    examDate: string;
    examBeginning: string;
    examEnding: string;
    teacherId: number;
    courseId: number;
    classroomId: number;
    examTypeId: number;
  }
  
  
  export type ExamResult = {
    id: number;
    examId: number;
    studentId: number;
    studentName: string;
    status: "PASSED" | "FAILED"; 
    score: number;
    scoreDate: string;
  }
  
  export type ExamResultsResponse = ExamResult[];
  export type Exam = {
    id: number;
    examDate: string;
    examBeginning: string;
    examEnding: string;
    examName: string;
    courseName: string;
    className: string;
    examTypeName: string;
    examLegalTypeName: string;
  };
  
  // Type for the exam list response
  export type Fee = {
    invoiceId: number;
    semesterName: string;
    creationDate: string;
    updateDate: string;
    dueDate: string;
    paidAmount: number;
    totalFeesAmount: number;
    feesCurrency: string;
    paymentStatus: string;
    discountAmount: number;
  };
  export type ExamListResponse = Exam[];
  
  export type Upcoming_Previous_Exams = {
    success: boolean;
    message: string;
    data: Fee[];
  };
  export type Student = {
    studentId: number;
    studentName: string;
    studyLevel: string;
    hasPhoto: boolean;
    photoLink: string | null;
    chatId: string | null;
    score?: number;
    passed?: boolean;
  };
  
  export type StudentsResponse = {
    success: boolean;
    message: string;
    data: {
      content: Student[];
      totalElementsCount: number;
      totalPagesCount: number;
      pageElementsCount: number;
      pageSize: number;
      pageNumber: number;
      firstPage: boolean;
      lastPage: boolean;
      emptyPage: boolean;
      sortedPage: boolean;
    };
  };
  
  export type StudentsWithGradesResponse = {
    success: boolean;
    message: string;
    data: {
      students: Student[];
      finalScore: number;
    };
  };
  export type AcademicYear = {
    id: number;
    name: string;
    active: boolean;
  };
  
  // Type for the full API response
  export type AcademicYearResponse = {
    success: boolean;
    message: string;
    data: AcademicYear[];
  };

  export type HomeworkResponse = {
    success: boolean;
    message: string;
    data: PaginationData<Homework>;
  };
  
  export type HomeWorkFormData = {
    title: string;
    description: string;
    deadline: string;
    sessionId: string;
  };
  export type PaginationData<T> = {
    content: T[];
    totalElementsCount: number;
    totalPagesCount: number;
    pageElementsCount: number;
    pageSize: number;
    pageNumber: number;
    firstPage: boolean;
    lastPage: boolean;
    emptyPage: boolean;
    sortedPage: boolean;
  };
  
  // Homework item interface
  export type Homework = {
    id: number;
    title: string;
    description: string;
    deadline: string; // Consider using Date if you're parsing the date
  };
  