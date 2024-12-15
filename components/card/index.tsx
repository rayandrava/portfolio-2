interface CardProps {
  title: string;
  body?: string;
  imageSrc: string;
  cardClassName?: string;
}

export const Card = ({ title, body = "", imageSrc, cardClassName }: CardProps) => (
  <div className={`group relative flex h-96 max-h-96 flex-col overflow-hidden rounded-xl bg-gray-3 ${cardClassName}`}>
    {/* Content section (left side) */}
    <div className="relative z-10 flex w-full flex-col items-start justify-center gap-1 p-6">
      <h3 className="w-full text-start text-default hover:decoration-none">{title}</h3>
      <p className="-mt-0 w-full text-start text-muted2 text-sm hover:decoration-none">{body}</p>
    </div>

    {/* Image section (right side) */}
    <div className="relative w-full flex-1">
      {/* Background blur */}
      <div className="absolute inset-0 top-28 overflow-visible opacity-0 transition-opacity delay-150 duration-300 ease-in-out group-hover:opacity-80">
        <img src={imageSrc} alt="" className="h-full w-full scale-75 object-cover blur-[72px]" />
      </div>

      {/* Main image container */}
      <div className="absolute inset-0 mt-1 flex items-start justify-center opacity-75 transition-all delay-150 duration-800 ease-in-out group-hover:mt-0 group-hover:opacity-100">
        <img src={imageSrc} alt={title} className="aspect-[4/3] w-full max-w-[472px] object-cover object-top" />
      </div>
    </div>
  </div>
);
