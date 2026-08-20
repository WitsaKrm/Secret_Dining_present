export default function ThemeBackground({ themeId }) {
  const imageUrl = `${import.meta.env.BASE_URL}images/${themeId}.jpg`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-50">
      {/* Mask out the edges so the image fades smoothly into the dark card border */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%)",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%)"
        }}
      />
    </div>
  );
}
