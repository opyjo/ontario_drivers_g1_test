import { redirect } from "next/navigation";

export default function QuizIndexPage() {
  redirect("/quiz/signs?limit=20");
}
