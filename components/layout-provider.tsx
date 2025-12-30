import Header from "./header";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col overflow-hidden">
      <div className="bottom-10 right-10 fixed z-50">
        <Header />
      </div>

      <main className="grow w-full max-w-7xl mx-auto p-4  pb-10">
        {children}
      </main>
    </section>
  );
}
