export const Background = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[hsl(var(--background))] bg-[image:var(--bg-image)] transition-colors duration-300" />

      {/* ambient glow orbs — visible across the full page */}
      <div className="absolute top-[8%] left-[6%] h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-[22%] right-[8%] h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute top-[45%] left-[12%] h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute top-[68%] right-[10%] h-52 w-52 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute top-[88%] left-[20%] h-48 w-48 rounded-full bg-accent/8 blur-3xl" />
    </div>
  );
};
