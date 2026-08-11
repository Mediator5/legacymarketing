import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'center',
  tone = 'light',
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: 'center' | 'left';
  /** 'dark' = this section sits on a navy band */
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className={cn('eyebrow', dark && 'text-gold-300')}>
            <span
              className={cn('h-px w-8', dark ? 'bg-gold-400/70' : 'bg-gold-600/70')}
              aria-hidden
            />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <h2
          className={cn(
            'mt-5 text-4xl leading-[1.12] sm:text-5xl lg:text-[3.05rem]',
            dark && 'text-white',
          )}
        >
          {title}{' '}
          {accent ? (
            <em
              className={cn('not-italic', dark ? 'text-gold-gradient-dark' : 'text-gold-gradient')}
            >
              {accent}
            </em>
          ) : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'mt-5 text-lg leading-relaxed',
              dark ? 'text-white/65' : 'text-navy-800/75',
              align === 'center' && 'mx-auto max-w-2xl',
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
