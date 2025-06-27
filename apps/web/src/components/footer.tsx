export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Devroots. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
