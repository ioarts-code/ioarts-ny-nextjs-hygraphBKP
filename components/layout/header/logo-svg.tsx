export function LogoSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text
        x="10"
        y="40"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        IOARTS@
      </text>
    </svg>
  )
}
