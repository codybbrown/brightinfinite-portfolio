import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body>
        {children}
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
