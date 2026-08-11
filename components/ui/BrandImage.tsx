'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * next/image with an on-brand fallback.
 * If a remote photo fails to load (bad URL, offline host, blocked network)
 * the user sees a navy/gold gradient panel instead of a broken image icon.
 */
export function BrandImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-label={typeof alt === 'string' ? alt : undefined}
        role="img"
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sand via-linen to-sand',
          className,
        )}
      >
        <span className="font-display text-5xl text-gold-600/40">L</span>
      </span>
    );
  }

  return <Image {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
}
