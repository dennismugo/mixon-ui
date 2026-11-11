import React from 'react';
import { ArrowUpRight, Building2, CalendarDays, Check, CircleDollarSign, Ticket, Warehouse } from 'lucide-react';

export type ProductSpotlightKind = 'rentals' | 'reserve' | 'events' | 'pos';

const productMeta: Record<ProductSpotlightKind, { name: string; label: string; title: string; Icon: typeof Building2 }> = {
  rentals: { name: 'miRentals', label: 'PROPERTY OPERATIONS', title: 'Portfolio overview', Icon: Building2 },
  reserve: { name: 'miReserve', label: 'HOSPITALITY', title: 'Reservation calendar', Icon: CalendarDays },
  events: { name: 'Event Yetu', label: 'EVENT OPERATIONS', title: 'Entry desk', Icon: Ticket },
  pos: { name: 'miPOS', label: 'RETAIL OPERATIONS', title: 'Store overview', Icon: Warehouse },
};

function WorkspacePreview({ kind }: { kind: ProductSpotlightKind }) {
  if (kind === 'rentals') {
    return (
      <div className="spotlight-preview-content">
        <div className="spotlight-preview-heading"><div><span>Portfolio</span><strong>Today at a glance</strong></div><span className="spotlight-date">All properties⌄</span></div>
        <div className="spotlight-stat-row"><div><span>Occupancy</span><strong>Unit overview</strong></div><div><span>Rent activity</span><strong>Collection status</strong></div></div>
        <div className="spotlight-table">
          <div className="spotlight-table-head"><span>PROPERTY</span><span>UNIT</span><span>STATUS</span></div>
          <div><span><i className="spotlight-dot spotlight-dot--blue"/> Kilimani Ridge</span><span>4B</span><b><Check size={12}/> Occupied</b></div>
          <div><span><i className="spotlight-dot spotlight-dot--gold"/> Garden Court</span><span>12A</span><b className="spotlight-status-muted">Follow up</b></div>
        </div>
      </div>
    );
  }
  if (kind === 'reserve') {
    return (
      <div className="spotlight-preview-content">
        <div className="spotlight-preview-heading"><div><span>Availability</span><strong>Reservations</strong></div><span className="spotlight-date">This week⌄</span></div>
        <div className="spotlight-calendar-head"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
        <div className="spotlight-calendar-grid"><span>12</span><span>13</span><span className="spotlight-booked">14 <small>Check-in</small></span><span>15</span><span className="spotlight-booked spotlight-booked--blue">16 <small>Reserved</small></span><span>17</span><span>18</span></div>
        <div className="spotlight-list-row"><span className="spotlight-icon"><CalendarDays size={15}/></span><span><b>Diani Beach Villa</b><small>Channel availability is aligned</small></span><ArrowUpRight size={15}/></div>
      </div>
    );
  }
  if (kind === 'events') {
    return (
      <div className="spotlight-preview-content">
        <div className="spotlight-preview-heading"><div><span>Live event</span><strong>Gate activity</strong></div><span className="spotlight-live"><i/> DOORS OPEN</span></div>
        <div className="spotlight-event-card"><div className="spotlight-ticket-art"><Ticket size={22}/><span>ENTRY PASS</span></div><div><span>UP NEXT</span><strong>Nairobi Design Week</strong><small>Gate A · Standard entry</small></div></div>
        <div className="spotlight-list-row"><span className="spotlight-icon"><Check size={15}/></span><span><b>Pass validated</b><small>Ready for the next scan</small></span><span className="spotlight-status-pill">CLEAR</span></div>
      </div>
    );
  }
  return (
    <div className="spotlight-preview-content">
      <div className="spotlight-preview-heading"><div><span>Store operations</span><strong>Shift overview</strong></div><span className="spotlight-date">Front counter⌄</span></div>
      <div className="spotlight-pos-summary"><span className="spotlight-icon"><CircleDollarSign size={17}/></span><div><span>Sales activity</span><strong>Shift in progress</strong></div><span className="spotlight-status-pill">OPEN</span></div>
      <div className="spotlight-stock-list"><div><span><i className="spotlight-dot spotlight-dot--blue"/> Popular items</span><b>Stock in view</b></div><div><span><i className="spotlight-dot spotlight-dot--gold"/> Reorder watch</span><b>Review list</b></div></div>
    </div>
  );
}

export default function ProductSpotlight({ kind, audience, detail }: { kind: ProductSpotlightKind; audience: string; detail: string }) {
  const product = productMeta[kind];
  const Icon = product.Icon;

  return (
    <figure className={`mixon-product-spotlight mixon-product-spotlight--${kind}`} aria-label={`${product.name} illustrative product preview`}>
      <div className="spotlight-orbit spotlight-orbit--one" aria-hidden="true" />
      <div className="spotlight-orbit spotlight-orbit--two" aria-hidden="true" />
      <div className="spotlight-audience"><span>DESIGNED FOR</span><strong>{audience}</strong><p>{detail}</p></div>
      <div className="spotlight-product-label"><span className="spotlight-brand-mark"><Icon size={15}/></span><span><b>MIXON / {product.name}</b><small>{product.label}</small></span><span className="spotlight-preview-tag">PRODUCT PREVIEW</span></div>
      <div className="spotlight-window">
        <div className="spotlight-window-top"><span>{product.title}</span><span className="spotlight-window-dots"><i/><i/><i/></span></div>
        <WorkspacePreview kind={kind}/>
      </div>
      <figcaption>Illustrative workspace preview</figcaption>
    </figure>
  );
}
