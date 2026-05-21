type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-black/20">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-2xl">
        !
      </div>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-400">{description}</p>
    </div>
  );
}
