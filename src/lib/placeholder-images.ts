import data from './placeholder-images.json';

export type AnimePlaceholder = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const animePlaceholders: AnimePlaceholder[] = data.placeholderImages;
