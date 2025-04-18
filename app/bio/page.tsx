import { getBio } from "@/lib/services/bio.api";
import BioCard from "@/components/modules/bio/BioCard";
import { notFound } from "next/navigation";

export default async function BioPage() {
  const bio = await getBio();

  if (!bio) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About</h1>
      <BioCard bio={bio} />
    </div>
  );
}
