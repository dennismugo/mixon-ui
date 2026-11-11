/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  productOfInterest: 'all' | 'mirentals' | 'mireserve' | 'eventyetu' | 'mipos';
  notes?: string;
  createdAt: string;
}

export type ProductType = 'mirentals' | 'mireserve' | 'eventyetu' | 'mipos';

export interface ProductDetail {
  id: ProductType;
  name: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  logoSvg: string;
}

export interface SimulationResult {
  product: ProductType;
  model: string;
  trigger: string;
  steps: string[];
  output: Record<string, any>;
  rawResponse?: string;
}
