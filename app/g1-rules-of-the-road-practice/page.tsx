import { PracticeLandingPage } from "@/components/content/practice-landing-page";
import { practiceLandingPages } from "@/lib/content/practice-pages";
import { publicMetadata } from "@/lib/seo";
const page = practiceLandingPages.rules;
export const metadata = publicMetadata({ title: page.title, description: page.description, path: page.path });
export default function Page() { return <PracticeLandingPage page={page} />; }
