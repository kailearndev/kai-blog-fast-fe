import Header from "./header";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col">
      <header className=" fixed left-0 w-full z-10 mt-4  overflow-hidden  ">
        <Header />
      </header>
      <main className="grow w-full  max-w-7xl mx-auto px-4 mt-36">
        {children}
      </main>
    </section>
  );
}
