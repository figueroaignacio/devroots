import { kebabCase } from 'lodash';

export function generateSlug(text: string): string {
  if (!text) {
    throw new Error('Text is required to generate a slug.');
  }
  return kebabCase(text.trim());
}
