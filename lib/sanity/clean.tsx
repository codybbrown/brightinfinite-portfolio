import { vercelStegaSplit } from "@vercel/stega";

export function Clean({ value }: { value: string }) {
  const { cleaned, encoded } = vercelStegaSplit(value);

  return encoded ? (
    <>
      {cleaned}
      <span style={{ display: "none" }}>{encoded}</span>
    </>
  ) : (
    cleaned
  );
}

export function cleanValue(value: string): string {
  const { cleaned } = vercelStegaSplit(value);
  return cleaned;
}
