export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 gap-6 justify-center items-center text-xl font-bold bg-card rounded-3xl px-4 py-8 self-stretch">
      {children}
    </div>
  );
}
