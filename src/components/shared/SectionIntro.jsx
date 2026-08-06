export default function SectionIntro({
  badge,
  title,
  description,
  align = "center",
  dark = false,
  className = "",
}) {
  const aligned = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-4 ${aligned} ${className}`}>
      {badge ? <div className={dark ? "site-badge-dark" : "site-badge"}>{badge}</div> : null}
      <div className="space-y-4">
        <h2 className={dark ? "site-title-dark" : "site-title"}>{title}</h2>
        {description ? (
          <p className={dark ? "site-copy-dark" : "site-copy"}>{description}</p>
        ) : null}
      </div>
    </div>
  );
}
