type GlowCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export function GlowCard({ icon: Icon, title, description }: GlowCardProps) {
  return (
    <article className="glass-card cinematic-card group relative overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-8">
      <div className="from-gold-400/10 to-gold-600/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="group-hover:border-gold-400/50 mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors">
          <Icon className="text-gold-400 group-hover:text-gold-300 h-7 w-7 transition-colors" />
        </div>

        <h3 className="group-hover:text-gold-300 mb-3 font-serif text-xl font-bold tracking-wide text-white transition-colors">
          {title}
        </h3>

        <p className="leading-relaxed font-light text-gray-400 transition-colors group-hover:text-gray-200">
          {description}
        </p>

        <div className="group-hover:via-gold-400/50 mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all" />
      </div>
    </article>
  );
}
