import Image from "next/image";
import { Bio } from "../../../types/bio.types";

interface BioCardProps {
  bio: Bio;
}

export default function BioCard({ bio }: BioCardProps) {
  return (
    <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={bio.image.url}
          alt={bio.image.alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{bio.name}</h1>
        <h2 className="text-xl text-muted-foreground mb-4">{bio.title}</h2>

        <p className="text-gray-600 mb-6">{bio.description}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {bio.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <div className="space-y-4">
            {bio.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h4 className="font-medium">{exp.title}</h4>
                <p className="text-muted-foreground">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {bio.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
