import Link from "next/link";
import { TrustPage } from "@/components/content/trust-page";
import { normalizeSupportEmail } from "@/lib/public-config";
import { publicMetadata } from "@/lib/seo";
export const metadata = publicMetadata({ title: "Contact DriveTest Pro", description: "Contact DriveTest Pro about account support, billing, accessibility, privacy, or a study-content correction.", path: "/contact" });
export default function ContactPage() {
  const supportEmail = normalizeSupportEmail(
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL
  );
  return <TrustPage title="Contact DriveTest Pro" intro="Use the published support channel for account, billing, accessibility, privacy, and content-correction questions.">
    <section><h2>Support</h2>{supportEmail ? <p>Email <a href={`mailto:${supportEmail}`}>{supportEmail}</a>. Do not include passwords, full payment-card numbers, government identification, or other unnecessary sensitive information.</p> : <p>A public support email has not been configured for this deployment. Account holders should use the support address in their account or billing correspondence. Site operators must set <code>NEXT_PUBLIC_SUPPORT_EMAIL</code> before launch.</p>}</section>
    <section><h2>Content corrections</h2><p>Include the page URL, the statement you believe needs correction, and a link to a current Ontario, DriveTest, or legislative source. Review our <Link href="/editorial-policy">editorial policy</Link> for the correction process.</p></section>
    <section><h2>Official licensing help</h2><p>DriveTest Pro cannot change a licence, test booking, fee, result, suspension, or government record. For those matters, contact <a href="https://www.ontario.ca/page/drivers-licence" target="_blank" rel="noreferrer">Ontario driver-licence services</a> or <a href="https://drivetest.ca/" target="_blank" rel="noreferrer">DriveTest</a>.</p></section>
  </TrustPage>;
}
