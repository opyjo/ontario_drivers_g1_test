# Signs Quiz Flow - Visual Diagram

## Complete Flow Diagram

```mermaid
graph TD
    A[User clicks "Quizzes" dropdown] --> B[Navigation Component<br/>components/navigation.tsx]
    B --> C[User clicks "Signs Practice"]
    C --> D[Navigate to /quiz/signs/setup]
    D --> E[SignsPracticeSetupPage<br/>app/quiz/signs/setup/page.tsx]
    E --> F[PracticeSetupPage Component<br/>components/quiz/setup/PracticeSetupPage.tsx]
    F --> G[User selects question limit<br/>10, 20, or 50 questions]
    G --> H[Router.push to /quiz/signs?limit=X]
    H --> I[SignsPracticePage<br/>app/quiz/signs/page.tsx]
    I --> J[SignsPracticeQuiz Component<br/>components/quiz/modes/SignsPracticeQuiz.tsx]
    J --> K[useSignsPractice Hook<br/>hooks/quiz/useSignsPractice.ts]
    K --> L[useQuizBase Hook<br/>hooks/quiz/useQuizBase.ts]
    L --> M[Quiz Store - initializeQuiz<br/>stores/quiz/quizStore.ts]
    M --> N[getSignsPracticeQuestions<br/>lib/quiz/server-actions.ts]
    N --> O[Supabase RPC Call<br/>get_signs_practice_questions]
    O --> P[Questions loaded into Quiz Store]
    P --> Q[Quiz Store - startQuiz]
    Q --> R[QuizContainer renders quiz UI]
    R --> S[QuestionDisplay shows current question]
    S --> T[AnswerOptions for user selection]
    T --> U[User selects answer A, B, C, or D]
    U --> V[Quiz Store - selectAnswer]
    V --> W[NavigationControls for next/prev/submit]
    W --> X{More questions?}
    X -->|Yes| Y[Next question]
    Y --> S
    X -->|No| Z[User clicks Submit]
    Z --> AA[Quiz Store - submitQuiz]
    AA --> BB[Calculate results and score]
    BB --> CC[ResultsDisplay shows final score]
```

## Detailed Component Interaction Flow

```mermaid
sequenceDiagram
    participant U as User
    participant N as Navigation
    participant SP as Setup Page
    participant QP as Quiz Page
    participant QC as Quiz Component
    participant H as useSignsPractice Hook
    participant QB as useQuizBase Hook
    participant QS as Quiz Store
    participant SA as Server Action
    participant DB as Supabase DB

    U->>N: Click "Quizzes" dropdown
    N->>U: Show dropdown options
    U->>N: Click "Signs Practice"
    N->>SP: Navigate to /quiz/signs/setup
    SP->>U: Show setup page with options
    U->>SP: Select question limit (10/20/50)
    SP->>QP: Navigate to /quiz/signs?limit=X
    QP->>QC: Render SignsPracticeQuiz
    QC->>H: Initialize useSignsPractice
    H->>QB: Initialize useQuizBase
    QB->>QS: Call initializeQuiz("signs_practice")
    QS->>SA: Call getSignsPracticeQuestions(limit)
    SA->>DB: RPC get_signs_practice_questions
    DB-->>SA: Return questions array
    SA-->>QS: Return validated questions
    QS->>QS: setQuestions(questions)
    QS->>QS: startQuiz()
    QS-->>QC: Quiz state ready
    QC->>U: Render quiz interface
    U->>QC: Select answer
    QC->>QS: selectAnswer(questionId, option)
    QS->>QS: Update progress
    QS-->>QC: State updated
    QC->>U: Show next question or submit option
    U->>QC: Click submit
    QC->>QS: submitQuiz()
    QS->>QS: Calculate results
    QS-->>QC: Quiz completed with results
    QC->>U: Show results page
```

## State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Idle: Initial state
    Idle --> Loading: User selects quiz
    Loading --> Active: Questions loaded
    Active --> Active: Answer questions
    Active --> Submitting: User submits
    Submitting --> Completed: Results calculated
    Completed --> Idle: Reset or new quiz
    Loading --> Error: Failed to load
    Active --> Error: Runtime error
    Error --> Loading: Retry
    Error --> Idle: Cancel
```

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Frontend Components"
        A[Navigation] --> B[Setup Page]
        B --> C[Quiz Page]
        C --> D[Quiz Component]
    end

    subgraph "Hooks Layer"
        E[useSignsPractice] --> F[useQuizBase]
    end

    subgraph "State Management"
        G[Quiz Store - Zustand]
    end

    subgraph "Server Layer"
        H[Server Actions]
    end

    subgraph "Database"
        I[Supabase RPC Functions]
        J[Questions Database]
    end

    D --> E
    F --> G
    G --> H
    H --> I
    I --> J

    J --> I
    I --> H
    H --> G
    G --> F
    F --> E
    E --> D
```

## Key Files and Their Roles

### Navigation Layer

- **`components/navigation.tsx`**: Main navigation with dropdown menu
- **`app/quiz/signs/setup/page.tsx`**: Setup page entry point

### Setup Layer

- **`components/quiz/setup/PracticeSetupPage.tsx`**: Generic setup component
- **`app/quiz/signs/page.tsx`**: Quiz page with URL parameter handling

### Quiz Layer

- **`components/quiz/modes/SignsPracticeQuiz.tsx`**: Main quiz component
- **`components/quiz/core/QuizContainer.tsx`**: Layout wrapper
- **`components/quiz/core/QuestionDisplay.tsx`**: Question rendering
- **`components/quiz/core/AnswerOptions.tsx`**: Answer selection UI
- **`components/quiz/core/NavigationControls.tsx`**: Navigation buttons
- **`components/quiz/core/ProgressIndicator.tsx`**: Progress display

### Hook Layer

- **`hooks/quiz/useSignsPractice.ts`**: Signs-specific quiz logic
- **`hooks/quiz/useQuizBase.ts`**: Common quiz functionality

### State Layer

- **`stores/quiz/quizStore.ts`**: Zustand store for quiz state
- **`stores/quiz/selectors.ts`**: Optimized state selectors

### Server Layer

- **`lib/quiz/server-actions.ts`**: Server actions for data fetching
- **`lib/quiz/constants.ts`**: Quiz configuration constants
- **`lib/quiz/utils.ts`**: Utility functions

### Database Layer

- **Supabase RPC Functions**: `get_signs_practice_questions`
- **Questions Tables**: `signs_questions`, `rules_questions`

## Question Limit Flow

```mermaid
graph TD
    A[User on Setup Page] --> B{Select Question Limit}
    B -->|10 questions| C[Quick Practice]
    B -->|20 questions| D[Medium Practice]
    B -->|50 questions| E[Extended Practice]
    C --> F[Router.push /quiz/signs?limit=10]
    D --> G[Router.push /quiz/signs?limit=20]
    E --> H[Router.push /quiz/signs?limit=50]
    F --> I[Quiz Page extracts limit from URL]
    G --> I
    H --> I
    I --> J[Validate limit with isValidQuestionLimit]
    J --> K[Pass limit to SignsPracticeQuiz]
    K --> L[useSignsPractice hook receives limit]
    L --> M[Server action fetches questions with limit]
```

## Error Handling Flow

```mermaid
graph TD
    A[Any Operation] --> B{Success?}
    B -->|Yes| C[Continue Flow]
    B -->|No| D[Error Caught]
    D --> E[Set Error State]
    E --> F[Show ErrorBoundary]
    F --> G{User Action}
    G -->|Retry| H[Retry Operation]
    G -->|Cancel| I[Return to Setup]
    H --> A
    I --> J[Reset State]
```

This comprehensive flow shows how the signs quiz system works from the initial user interaction through to completion, including all the key components, state management, error handling, and data flow.
