import { motion, useReducedMotion } from 'motion/react';
import MiRentalsDashboardIllustration from './illustrations/MiRentalsDashboardIllustration';
import MiReserveDashboardIllustration from './illustrations/MiReserveDashboardIllustration';
import EventYetuDashboardIllustration from './illustrations/EventYetuDashboardIllustration';
import MiPosDashboardIllustration from './illustrations/MiPosDashboardIllustration';

export type ProductPanelVariant = 'mi-rentals' | 'mi-reserve' | 'event-yetu' | 'mi-pos';

interface ProductPhotoPanelProps {
  image?: string;
  alt?: string;
  variant?: ProductPanelVariant;
}

/** 
 * High-craft product process & transaction illustration card matching Image 2 style.
 * Displays blue gradient background with vertical telemetry lines, a floating frosted glass card,
 * and clean UI illustrations matching the specific product content.
 */
export default function ProductPhotoPanel({ image, alt = '', variant }: ProductPhotoPanelProps) {
  const reduceMotion = useReducedMotion();

  // If variant is not explicitly passed, infer from alt text or fallback
  const resolvedVariant: ProductPanelVariant | undefined =
    variant ||
    (alt.toLowerCase().includes('rental') || alt.toLowerCase().includes('riverside')
      ? 'mi-rentals'
      : alt.toLowerCase().includes('resort') || alt.toLowerCase().includes('villa') || alt.toLowerCase().includes('reserve')
      ? 'mi-reserve'
      : alt.toLowerCase().includes('concert') || alt.toLowerCase().includes('ticket') || alt.toLowerCase().includes('event')
      ? 'event-yetu'
      : alt.toLowerCase().includes('boutique') || alt.toLowerCase().includes('retail') || alt.toLowerCase().includes('pos')
      ? 'mi-pos'
      : undefined);

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.99 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate w-full overflow-hidden rounded-[22px] sm:rounded-[26px] shadow-[0_20px_50px_-20px_rgba(7,21,54,0.35)]"
    >
      {resolvedVariant === 'mi-rentals' ? (
        <MiRentalsDashboardIllustration />
      ) : resolvedVariant === 'mi-reserve' ? (
        <MiReserveDashboardIllustration />
      ) : resolvedVariant === 'event-yetu' ? (
        <EventYetuDashboardIllustration />
      ) : resolvedVariant === 'mi-pos' ? (
        <MiPosDashboardIllustration />
      ) : image ? (
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <MiRentalsDashboardIllustration />
      )}
    </motion.figure>
  );
}
