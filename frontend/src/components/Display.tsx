type PropTypes = {
  src: string;
  alt?: string;
};

export function Display({ src, alt = "" }: PropTypes) {
  return (
    <div className="w-full h-full">
      <img src={src} alt={alt} />
    </div>
  );
}
