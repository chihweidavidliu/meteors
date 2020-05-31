import { IQuestion } from "../types/Question";
import { useState, useEffect } from "react";
import { getRandomInt } from "../util/getRandomInt";

export const useQuestionHandler = (
  initialQuestions: IQuestion[],
  isStarted: boolean
) => {
  const [questions, setQuestions] = useState<IQuestion[]>(initialQuestions);
  const [activeQuestions, setActiveQuestions] = useState<IQuestion[]>([]);
  const [lastDestroyed, setLastDestroyed] = useState<IQuestion | null>(null);

  useEffect(() => {
    const activateQuestion = (): any => {
      if (questions.length === 0) {
        return;
      }
      // choose a random index
      const randomIndex = getRandomInt(questions.length - 1);
      const chosen = questions[randomIndex];
      const { stats } = chosen;

      setActiveQuestions((prevQuestions) => {
        return [
          ...prevQuestions,
          {
            ...chosen,
            stats: { ...stats, appearances: stats.appearances++ },
          },
        ];
      });

      setQuestions(questions.filter((question) => question.id !== chosen.id));
    };

    if (isStarted) {
      const interval = setInterval(() => {
        activateQuestion();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isStarted, questions]);

  return {
    questions,
    setQuestions,
    activeQuestions,
    setActiveQuestions,
    lastDestroyed,
    setLastDestroyed,
  };
};
