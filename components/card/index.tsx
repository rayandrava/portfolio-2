interface CardProps {
  title: string;
  body?: string;
  imageSrc: string;
  cardClassName?: string;
}

export const Card = ({ title, body = "", imageSrc, cardClassName }: CardProps) => (
    <div className={`relative flex flex-col items-start gap-1 rounded-xl min-h-60 bg-gray-3 shadow-sm hover:decoration-none p-4 overflow-hidden ${cardClassName}`}>
        <div className="flex flex-col items-start md:gap-2 gap-1 z-50 md:max-w-[70%] w-full">
            <h3 className="hover:decoration-none">{title}</h3>
            <p className="-mt-0 text-sm hover:decoration-none">{body}</p>
        </div>
        <div className="transform-style-3d">
        <img 
            src={imageSrc} 
            alt={title} 
            className="image-3d"
        />
        </div>
    </div>
);