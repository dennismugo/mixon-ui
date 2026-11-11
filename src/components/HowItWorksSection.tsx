import { motion, useReducedMotion } from 'motion/react';
import { Compass, Lightbulb, PanelsTopLeft, Rocket, Search, Settings2, ShieldCheck, Smartphone, Sparkles, Workflow } from 'lucide-react';

type ProcessStep = { title: string; desc: string };

interface HowItWorksSectionProps {
  eyebrow: string;
  heading: string;
  description: string;
  steps: ProcessStep[];
}

const stepIcons = [Compass, Lightbulb, PanelsTopLeft, Rocket, Search, Settings2, ShieldCheck, Smartphone, Sparkles, Workflow];
const stepTones = ['blue', 'lilac', 'mint', 'amber'];
const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function HowItWorksSection({ eyebrow, heading, description, steps }: HowItWorksSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="mixon-process-section">
      <div className="mixon-process-inner">
        <motion.header
          className="mixon-process-header"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mixon-process-eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{description}</p>
        </motion.header>

        <div className="mixon-process-grid" data-count={steps.length}>
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <motion.article
                key={`${step.title}-${index}`}
                className="mixon-process-step"
                custom={index}
                initial={reducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={stepVariants}
              >
                <div className={`mixon-process-icon mixon-process-icon-${stepTones[index % stepTones.length]}`} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
