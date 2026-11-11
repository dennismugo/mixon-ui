import { motion, useReducedMotion } from 'motion/react';
import {
  Activity, BarChart3, Bot, Code2, CreditCard,
  Globe2, Layers3, LockKeyhole, Search, ShieldCheck, ShoppingBag,
  Smartphone, Sparkles, Workflow
} from 'lucide-react';

type Capability = { title: string; desc: string };

interface ServiceCapabilitiesProps {
  eyebrow: string;
  heading: string;
  description: string;
  items: Capability[];
}

const iconSet = [Code2, ShieldCheck, BarChart3, Smartphone, Search, Workflow, CreditCard, ShoppingBag, Bot, Globe2, LockKeyhole, Layers3, Activity, Sparkles];
const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay: index * 0.085, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ServiceCapabilities({ eyebrow, heading, description, items }: ServiceCapabilitiesProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="mixon-service-capabilities">
      <div className="mixon-service-capabilities-inner">
        <motion.header
          className="mixon-service-capabilities-header"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mixon-service-capabilities-eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{description}</p>
        </motion.header>

        <div className="mixon-service-capabilities-grid">
          {items.map((item, index) => {
            const Icon = iconSet[index % iconSet.length];
            return (
              <motion.article
                key={`${item.title}-${index}`}
                className={`mixon-service-capability-card mixon-service-capability-card-${index % 4}`}
                custom={index}
                initial={reducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={cardVariants}
                whileHover={reducedMotion ? undefined : { y: -5, transition: { duration: 0.22 } }}
              >
                <div className="mixon-service-capability-icon" aria-hidden="true"><Icon size={23} strokeWidth={1.7} /></div>
                <div className="mixon-service-capability-copy">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
