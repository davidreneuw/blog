export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-300">
      <main>{children}</main>
    </div>
  );
}
