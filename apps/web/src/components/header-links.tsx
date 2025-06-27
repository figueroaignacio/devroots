// Components
import Link from 'next/link';
import { Button } from './ui/button';

export function HeaderLinks() {
  return (
    <ul className="flex">
      <li>
        <Button asChild variant="link">
          <Link href="/">Home</Link>
        </Button>
      </li>
      <li>
        <Button asChild variant="link">
          <Link href="/about">About</Link>
        </Button>
      </li>
      <li>
        <Button asChild variant="link">
          <Link href="/about">Blog</Link>
        </Button>
      </li>
    </ul>
  );
}
