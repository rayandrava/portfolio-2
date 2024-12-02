interface CardProps {
  title: string;
  body?: string;
  imageSrc: string;
  cardClassName?: string;
}

export const Card = ({ title, body = "", imageSrc, cardClassName }: CardProps) => (
  <div
    className={`relative flex min-h-60 flex-col items-start gap-1 overflow-hidden rounded-xl bg-gray-3 p-4 shadow-sm hover:decoration-none ${cardClassName}`}
  >
    <div className="z-50 flex w-full flex-col items-start gap-1 md:max-w-[70%] md:gap-2">
      <h3 className="hover:decoration-none">{title}</h3>
      <p className="-mt-0 text-sm hover:decoration-none">{body}</p>
    </div>
    <div className="transform-style-3d">
      <img src={imageSrc} alt={title} className="image-3d" />
    </div>
  </div>
);
