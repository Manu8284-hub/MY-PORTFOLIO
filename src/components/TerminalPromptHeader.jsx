import TextScramble from './TextScramble';

/**
 * TerminalPromptHeader
 * Cyberpunk section header formatted as a terminal command prompt:
 * e.g., > projects_ with status tag and blinking cursor
 */
export default function TerminalPromptHeader({
  prompt = '>',
  title,
  tag = '// SECTION',
  subtitle = '',
  className = ''
}) {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#00FF9C]/80 tracking-widest uppercase">
        <span className="inline-block w-2 h-2 rounded-full bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]" />
        <span>{tag}</span>
        <span className="text-[#1B2433]">|</span>
        <span className="text-[#6B7A90]">SYS.READY</span>
      </div>

      <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
        <span className="text-[#00FF9C] font-mono text-2xl sm:text-4xl font-bold select-none">
          {prompt}
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#D6E2F0] font-['Space_Grotesk']">
          <TextScramble text={title} />
        </h2>
        <span className="terminal-cursor text-xl sm:text-3xl ml-1" aria-hidden="true" />
      </div>

      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-[#6B7A90] font-mono max-w-2xl">
          // {subtitle}
        </p>
      )}
    </div>
  );
}
