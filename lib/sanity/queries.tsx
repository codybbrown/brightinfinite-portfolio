export const audioTrackQuery = `*[_type == "audioTrack"] {
  "id": _id,
  title,
  description,
  "audioUrl": audioFile.asset->url,
  duration,
  "coverImage": coverImage {
    "url": asset->url,
    "alt": alt
  }
}`;

export const artistQuery = `*[_type == "artist"][0] {
  "id": _id,
  name,
  slug,
  bio,
  "photo": photo {
    "url": asset->url,
    "alt": alt
  },
  "instruments": instruments[]->{
    "id": _id,
    name
  },
  "genres": genres[]->{
    "id": _id,
    name
  }
}`;

export const bioQuery = `*[_type == "bio"][0] {
  "id": _id,
  name,
  title,
  description,
  "image": image {
    "url": asset->url,
    "alt": alt
  },
  socialLinks[] {
    platform,
    url
  },
  skills,
  experience[] {
    title,
    company,
    period,
    description
  }
}`;

export const productQuery = `*[_type == "product"] {
  "id": _id,
  name,
  price,
  description,
  "images": images[] {
    "url": asset->url,
    "alt": alt
  },
  category,
  stock,
  metadata
}`;

export const contactInfoQuery = `*[_type == "contactInfo"][0] {
  email,
  phone,
  address,
  socialMedia[] {
    platform,
    url
  },
  businessHours[] {
    day,
    hours
  }
}`;
