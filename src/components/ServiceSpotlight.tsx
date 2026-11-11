import React from 'react';
import webImage from '../assets/images/services/service_web.jpg';
import appImage from '../assets/images/services/service_app.jpg';
import seoImage from '../assets/images/services/service_seo.jpg';
import paymentsImage from '../assets/images/services/service_payments.jpg';
import commerceImage from '../assets/images/services/service_ecommerce.jpg';
import aiImage from '../assets/images/services/service_ai.jpg';

export type ServiceSpotlightKind = 'web' | 'app' | 'seo' | 'payments' | 'commerce' | 'ai';

const serviceImages: Record<ServiceSpotlightKind, string> = {
  web: webImage,
  app: appImage,
  seo: seoImage,
  payments: paymentsImage,
  commerce: commerceImage,
  ai: aiImage,
};

export default function ServiceSpotlight({ kind, audience, detail }: { kind: ServiceSpotlightKind; audience: string; detail: string }) {
  return (
    <figure className={`mixon-service-spotlight mixon-service-spotlight--${kind}`}>
      <img src={serviceImages[kind]} alt="" />
      <div className="mixon-service-spotlight-scrim" />
      <div className="mixon-service-spotlight-content">
        <span>BEST FOR</span>
        <strong>{audience}</strong>
        <p>{detail}</p>
      </div>
      <figcaption><span>MIXON / SERVICES</span><span>Designed around real work</span></figcaption>
    </figure>
  );
}
