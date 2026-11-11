"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// A landing-page opener in three beats. A saturated card whose vertical stripes
// pulse in a slow travelling wave (and flare under the pointer) holds the
// headline and four stats that count up. Under it a band of customer wordmarks
// drifts by, and a statement lights up word by word as it scrolls through.

export type PulseStat = {
  /** Number to count up to. */
  value: number
  /** Decimal places shown while counting. */
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
}

export type PulseStripePalette = { from: string; to: string; glow: string; ink: string }

export const PULSE_PALETTES = {
  // deep ink lit by sodium street lamps
  sodium: { from: "#1c140c", to: "#070605", glow: "#ffa64d", ink: "#f5e9d6" },
  // newsprint and vermilion, like a two-colour print
  paper: { from: "#f2ebdd", to: "#e3d8c3", glow: "#d6421d", ink: "#1a1612" },
  // slate under moonlight
  mercury: { from: "#151a20", to: "#06080b", glow: "#d6e4f2", ink: "#edf2f7" },
  // Mixon brand palette: darkish midnight/royal blue base with luminous light-blue vertical waves
  mixon: { from: "#04122B", to: "#083071", glow: "#38BDF8", ink: "#E0F2FE" },
} satisfies Record<string, PulseStripePalette>

export type PulseStripeHeroProps = {
  eyebrow?: string
  title?: string
  description?: React.ReactNode
  cta?: { label: string; href?: string; onClick?: () => void }
  stats?: PulseStat[]
  /** Customer names, set as wordmarks in the drifting band. Empty hides the band. */
  logos?: string[]
  /** Statement that lights up word by word on scroll. Empty hides it. */
  statement?: string
  statementLabel?: string
  palette?: keyof typeof PULSE_PALETTES | PulseStripePalette
  /** Number of stripes across the card. */
  stripes?: number
  /** Card height. Keep it a definite length; percentages collapse once installed. */
  height?: string
  className?: string
}

export type PulseStripeBackgroundProps = {
  palette?: keyof typeof PULSE_PALETTES | PulseStripePalette
  /** Number of vertical columns across the surface. */
  stripes?: number
  /** "full" animates all columns; "sides" keeps the center calm and only animates outer margins. */
  layoutVariant?: "full" | "sides"
  /** Pulse cycle duration in seconds (larger = calmer, slower sweep). */
  durationSec?: number
  className?: string
}

// #region format
/** Formats a counter frame: fixed decimals, thousands separated. */
export function formatStat(v: number, decimals = 0, prefix = "", suffix = ""): string {
  const n = Math.max(0, v)
  const fixed = n.toFixed(decimals)
  const [int, frac] = fixed.split(".")
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return prefix + grouped + (frac ? "." + frac : "") + suffix
}

/** Phase offset (seconds, negative) for stripe i so the pulse travels across. */
export function stripeDelay(i: number, n: number, period = 4.2): number {
  if (n <= 0) return 0
  return -((i / n) * period * 1.5) % period
}

/** Splits "a *b* c" into plain and italic runs. */
export function runs(line: string): { text: string; em: boolean }[] {
  return line.split("*").map((text, i) => ({ text, em: i % 2 === 1 })).filter((r) => r.text)
}

/** Words of the statement, keeping punctuation on its word. */
export function words(text: string): string[] {
  return text.split(/\s+/).filter(Boolean)
}
// #endregion

// Wordmark styles for the band; they cycle so the names don't all look alike.
const MARKS = [
  { fontWeight: 800, letterSpacing: "-0.04em" },
  { fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, fontSize: "0.78em" },
  { fontFamily: "ui-serif,Georgia,serif", fontStyle: "italic" as const, fontWeight: 500 },
  { fontWeight: 300, letterSpacing: "-0.02em" },
  { fontWeight: 700, letterSpacing: "0.02em", textTransform: "lowercase" as const },
]

// Shared background stripes, vertical moving glow wave, bottom ambient lamp, radial shade, and fine grain
const PULSE_BG_CSS =
  ".psh-bg-root{position:absolute;inset:0;overflow:hidden;isolation:isolate;contain:layout paint style;background:linear-gradient(180deg,var(--psh-from),var(--psh-to))}" +
  ".psh-bg-root *{box-sizing:border-box}" +
  ".psh-stripes{position:absolute;inset:0;display:flex}" +
  ".psh-col{position:relative;flex:1;overflow:hidden;contain:strict;border-right:1px solid color-mix(in oklab,var(--psh-ink) 9%,transparent);transform-origin:50% 100%;transition:background-color .65s ease}" +
  ".psh-col:last-child{border-right:0}" +
  ".psh-col::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,color-mix(in oklab,var(--psh-ink) 5%,transparent) 56%,color-mix(in oklab,var(--psh-glow) 16%,transparent) 100%);opacity:.85}" +
  ".psh-col>i{position:absolute;left:0;right:0;top:-65%;height:65%;background:linear-gradient(180deg,transparent 0%,color-mix(in oklab,var(--psh-glow) 12%,transparent) 30%,color-mix(in oklab,var(--psh-glow) 44%,transparent) 62%,color-mix(in oklab,var(--psh-glow) 76%,transparent) 78%,color-mix(in oklab,var(--psh-glow) 30%,transparent) 90%,transparent 100%);" +
  "opacity:var(--psh-col-opacity,.65);animation:psh-pulse var(--psh-duration,4.2s) ease-in-out infinite}" +
  ".psh-col:not(.psh-col-quiet):hover{background-color:color-mix(in oklab,var(--psh-glow) 10%,transparent);transition:background-color .25s}" +
  ".psh-col:not(.psh-col-quiet):hover>i{opacity:.85}" +
  ".psh-sides .psh-col-quiet{border-right-color:color-mix(in oklab,var(--psh-ink) 4%,transparent)}" +
  ".psh-sides .psh-col-quiet::before{opacity:.14}" +
  ".psh-shade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(70% 55% at 50% 38%,color-mix(in oklab,var(--psh-to) 48%,transparent),transparent 75%),linear-gradient(0deg,color-mix(in oklab,var(--psh-to) 78%,transparent),transparent 45%)}" +
  ".psh-sides .psh-shade{background:radial-gradient(66% 62% at 50% 45%,color-mix(in oklab,var(--psh-from) 92%,transparent) 0%,color-mix(in oklab,var(--psh-from) 68%,transparent) 48%,transparent 82%),linear-gradient(0deg,color-mix(in oklab,var(--psh-to) 72%,transparent),transparent 42%)}" +
  ".psh-lamp{position:absolute;left:-10%;right:-10%;bottom:-38%;height:70%;pointer-events:none;border-radius:50%;background:radial-gradient(closest-side,color-mix(in oklab,var(--psh-glow) 34%,transparent),transparent 72%);animation:psh-breathe 11s ease-in-out infinite}" +
  ".psh-sides .psh-lamp{display:none}" +
  ".psh-lamp-side{position:absolute;bottom:-30%;width:42%;height:68%;pointer-events:none;border-radius:50%;background:radial-gradient(closest-side,color-mix(in oklab,var(--psh-glow) 22%,transparent),transparent 72%);animation:psh-breathe 12s ease-in-out infinite}" +
  ".psh-lamp-left{left:-16%}" +
  ".psh-lamp-right{right:-16%;animation-delay:-6s}" +
  ".psh-grain{position:absolute;inset:0;pointer-events:none;opacity:.08;background-image:radial-gradient(rgba(255,255,255,0.28) 0.5px,transparent 0.5px);background-size:6px 6px}" +
  "@keyframes psh-pulse{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(0,270%,0)}}" +
  "@keyframes psh-breathe{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:.95;transform:scale(1.05)}}" +
  "@media (max-width:767px){.psh-sides .psh-col-edge-inner>i{display:none;animation:none}.psh-sides .psh-col-edge-inner::before{opacity:.2}.psh-sides .psh-lamp-side{animation:none;opacity:.75}.psh-sides .psh-col>i{transform:translateZ(0)}}" +
  "@media (prefers-reduced-motion:reduce){.psh-col>i,.psh-lamp,.psh-lamp-side{animation:none}}"

const CSS =
  PULSE_BG_CSS +
  ".psh-root{position:relative;width:100%;background:var(--color-background,#fff);color:var(--color-foreground,#111);font-family:'DM Sans',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;padding:12px}" +
  ".psh-root *{box-sizing:border-box}" +
  ".psh-card{position:relative;overflow:hidden;isolation:isolate;border-radius:30px;color:var(--psh-ink);background:linear-gradient(180deg,var(--psh-from),var(--psh-to));" +
  "box-shadow:0 50px 90px -50px rgba(0,0,0,.5),inset 0 1px 0 color-mix(in oklab,var(--psh-ink) 14%,transparent);clip-path:inset(6% 4% 6% 4% round 30px);transition:clip-path 1.5s cubic-bezier(.77,0,.18,1)}" +
  ".psh-in .psh-card{clip-path:inset(0 0 0 0 round 30px)}" +
  ".psh-card .psh-col{transform:scaleY(0);transition:transform 1.4s cubic-bezier(.16,1,.3,1),background-color .6s}" +
  ".psh-in .psh-card .psh-col{transform:none}" +
  "@media (prefers-reduced-motion:reduce){.psh-card .psh-col{transform:none;transition:none}}" +
  ".psh-inner{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;align-items:center;text-align:center;padding:clamp(28px,5vw,64px) 20px clamp(24px,3vw,40px);pointer-events:none}" +
  ".psh-top{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}" +
  ".psh-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;opacity:.8}" +
  ".psh-eyebrow i{width:6px;height:6px;border-radius:50%;background:var(--psh-glow);box-shadow:0 0 12px var(--psh-glow)}" +
  ".psh-h{margin:20px 0 0;max-width:16ch;font-family:'Newsreader',ui-serif,Georgia,serif;font-weight:400;font-size:clamp(46px,7.6vw,124px);line-height:.94;letter-spacing:-.03em;text-wrap:balance}" +
  ".psh-h em{font-style:italic;color:var(--psh-glow)}" +
  ".psh-line{display:block;overflow:hidden;padding-bottom:.06em}" +
  ".psh-line>span{display:block;transform:translateY(105%);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}" +
  ".psh-in .psh-line>span{transform:none}" +
  ".psh-desc{margin:20px 0 0;max-width:46ch;font-size:clamp(15px,1.2vw,17px);line-height:1.55;font-weight:420;opacity:.82;text-wrap:balance}" +
  ".psh-fade{opacity:0;transform:translateY(12px);transition:opacity .9s ease,transform 1.1s cubic-bezier(.16,1,.3,1)}" +
  ".psh-in .psh-fade{opacity:1;transform:none}" +
  ".psh-cta{display:inline-flex;align-items:center;gap:10px;height:48px;margin-top:28px;padding:0 8px 0 22px;border-radius:999px;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:0;pointer-events:auto;" +
  "color:var(--psh-to);background:var(--psh-ink);box-shadow:0 14px 30px -12px rgba(0,0,0,.5);transition:transform .45s cubic-bezier(.3,1.5,.5,1),box-shadow .3s}" +
  ".psh-cta:hover{transform:translateY(-2px);box-shadow:0 20px 36px -12px rgba(0,0,0,.55)}" +
  ".psh-cta:active{transform:scale(.96)}" +
  ".psh-cta:focus-visible{outline:2px solid var(--psh-ink);outline-offset:3px}" +
  ".psh-cta b{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--psh-to);color:var(--psh-ink);transition:transform .45s cubic-bezier(.3,1.5,.5,1)}" +
  ".psh-cta:hover b{transform:rotate(-45deg)}" +
  ".psh-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:min(980px,100%);margin-top:32px;border-top:1px solid color-mix(in oklab,var(--psh-ink) 18%,transparent)}" +
  ".psh-stat{display:flex;flex-direction:column;padding:22px 8px 0;border-left:1px solid color-mix(in oklab,var(--psh-ink) 12%,transparent)}" +
  ".psh-stat:first-child{border-left:0}" +
  ".psh-num{display:block;font-weight:600;font-size:clamp(26px,3.2vw,46px);letter-spacing:-.04em;font-variant-numeric:tabular-nums;line-height:1}" +
  ".psh-lab{display:block;margin-top:8px;font-size:12.5px;opacity:.7}" +
  ".psh-band{position:relative;overflow:hidden;margin-top:12px;padding:30px 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}" +
  ".psh-track{display:flex;width:max-content;animation:psh-drift 38s linear infinite}" +
  ".psh-band:hover .psh-track{animation-play-state:paused}" +
  ".psh-mark{flex:none;padding:0 clamp(28px,4vw,56px);font-size:clamp(20px,2vw,26px);color:var(--color-muted-foreground,#777);white-space:nowrap;transition:color .3s}" +
  ".psh-mark:hover{color:var(--color-foreground,#111)}" +
  ".psh-say{max-width:1100px;margin:0 auto;padding:clamp(64px,12vw,160px) 24px}" +
  ".psh-say-lab{display:block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--psh-glow);text-align:center}" +
  ".psh-say p{margin:20px 0 0;text-align:center;font-family:'Newsreader',ui-serif,Georgia,serif;font-weight:400;font-size:clamp(30px,4.2vw,62px);line-height:1.1;letter-spacing:-.025em;text-wrap:balance}" +
  ".psh-word{opacity:.16;transition:opacity .25s linear}" +
  "@keyframes psh-drift{to{transform:translateX(-50%)}}" +
  "@media (max-width:720px){.psh-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.psh-stat:nth-child(3){border-left:0}.psh-stat:nth-child(n+3){margin-top:4px}.psh-root{padding:8px}.psh-card{border-radius:22px}}" +
  "@media (prefers-reduced-motion:reduce){.psh-track{animation:none}.psh-card,.psh-line>span,.psh-fade,.psh-cta,.psh-cta b{transition:none}.psh-word{opacity:1}}"

/**
 * Animated vertical stripe background layer with travelling pulse waves and horizon glow.
 * Supports "sides" layoutVariant to leave the central hero copy calm and legible while framing with slow outer-edge motion.
 */
export function PulseStripeBackground({
  palette = "mixon",
  stripes = 16,
  layoutVariant = "full",
  durationSec,
  className = "",
}: PulseStripeBackgroundProps) {
  const pal = typeof palette === "string" ? PULSE_PALETTES[palette] || PULSE_PALETTES.mixon : palette
  const n = Math.max(1, Math.round(stripes))
  const isSides = layoutVariant === "sides"
  const period = durationSec ?? (isSides ? 9.5 : 4.2)
  const center = (n - 1) / 2

  return (
    <div
      aria-hidden="true"
      className={
        "psh-bg-root psh-in" +
        (isSides ? " psh-sides" : "") +
        (className ? " " + className : "")
      }
      style={
        {
          "--psh-from": pal.from,
          "--psh-to": pal.to,
          "--psh-glow": pal.glow,
          "--psh-ink": pal.ink,
          "--psh-duration": `${period}s`,
        } as React.CSSProperties
      }
    >
      <style>{PULSE_BG_CSS}</style>
      <div className="psh-stripes">
        {Array.from({ length: n }, (_, i) => {
          const edgeRatio = n <= 1 ? 1 : Math.abs(i - center) / Math.max(1, center)
          const isQuietCenter = isSides && edgeRatio < 0.55
          const isInnerEdge = isSides && !isQuietCenter && edgeRatio < 0.8
          const colOpacity = isSides
            ? Number((0.18 + ((edgeRatio - 0.55) / 0.45) * 0.36).toFixed(2))
            : 0.65

          // Mirror timing gently from outermost columns inward for a calm perimeter cadence
          const symIndex = Math.min(i, n - 1 - i)
          const sideOffset = isSides && i >= n / 2 ? -(period * 0.28) : 0
          const delay = isSides
            ? stripeDelay(symIndex, Math.ceil(n * 0.35), period) + sideOffset
            : stripeDelay(i, n, period)

          return (
            <span
              className={`psh-col${isQuietCenter ? " psh-col-quiet" : isInnerEdge ? " psh-col-edge-inner" : ""}`}
              key={i}
              style={
                !isQuietCenter
                  ? ({ "--psh-col-opacity": String(colOpacity) } as React.CSSProperties)
                  : undefined
              }
            >
              {!isQuietCenter && <i style={{ animationDelay: `${delay.toFixed(2)}s` }} />}
            </span>
          )
        })}
      </div>
      {isSides ? (
        <>
          <div className="psh-lamp-side psh-lamp-left" />
          <div className="psh-lamp-side psh-lamp-right" />
        </>
      ) : (
        <div className="psh-lamp" />
      )}
      <div className="psh-shade" />
      <div className="psh-grain" />
    </div>
  )
}

export default function PulseStripeHero({
  eyebrow = "Overnight freight, routed live",
  title = "Freight that moves *while the city sleeps.*",
  description = "Nightline plans every van, depot and dock door for the overnight run, and re-routes in seconds when a motorway closes at 2 a.m.",
  cta = { label: "Book a route review" },
  stats = [
    { value: 1.2, decimals: 1, suffix: "M", label: "Parcels routed a night" },
    { value: 412, label: "Depots on the network" },
    { value: 99.2, decimals: 1, suffix: "%", label: "Delivered before 7 a.m." },
    { value: 38, suffix: "s", label: "Average re-route" },
  ],
  logos = ["Halvard Freight", "NORTHGATE", "Ostler & Co", "Basalt Rail", "kestrel", "Pinewell", "MERIDIAN", "Fathom Cold Chain"],
  statement = "Most networks plan the night at six and hope. Nightline keeps planning until the last van is back in the yard.",
  statementLabel = "Why Nightline",
  palette = "sodium",
  stripes = 16,
  height = "calc(100svh - 24px)",
  className,
}: PulseStripeHeroProps) {
  const root = React.useRef(null as HTMLElement | null)
  const [ready, setReady] = React.useState(false)
  const pal = typeof palette === "string" ? PULSE_PALETTES[palette] || PULSE_PALETTES.sodium : palette

  React.useEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const raf = requestAnimationFrame(() => setReady(true))
    const ctx = gsap.context(() => {
      // Stats count up once the card is on screen.
      el.querySelectorAll(".psh-num").forEach((node, i) => {
        const s = stats[i]
        if (!s) return
        const out = node as HTMLElement
        if (reduce) {
          out.textContent = formatStat(s.value, s.decimals, s.prefix, s.suffix)
          return
        }
        const o = { v: 0 }
        out.textContent = formatStat(0, s.decimals, s.prefix, s.suffix)
        gsap.to(o, {
          v: s.value,
          duration: 2.2,
          delay: 0.9 + i * 0.12,
          ease: "power3.out",
          onUpdate: () => (out.textContent = formatStat(o.v, s.decimals, s.prefix, s.suffix)),
          scrollTrigger: { trigger: el.querySelector(".psh-card"), start: "top 85%", once: true },
        })
      })
      // The statement lights up as it crosses the middle of the viewport.
      const ws = el.querySelectorAll(".psh-word")
      if (ws.length && !reduce) {
        gsap.to(ws, {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el.querySelector(".psh-say p"), start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        })
      }
    }, el)
    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const n = Math.max(1, Math.round(stripes))
  return (
    <section
      ref={root}
      className={"psh-root" + (ready ? " psh-in" : "") + (className ? " " + className : "")}
      style={{ "--psh-from": pal.from, "--psh-to": pal.to, "--psh-glow": pal.glow, "--psh-ink": pal.ink } as React.CSSProperties}
    >
      <style>{CSS}</style>
      <div className="psh-card" style={{ height }}>
        <div className="psh-stripes" aria-hidden="true">
          {Array.from({ length: n }, (_, i) => (
            <span className="psh-col" key={i} style={{ transitionDelay: 0.25 + Math.abs(i - (n - 1) / 2) * 0.05 + "s" }}>
              <i style={{ animationDelay: stripeDelay(i, n) + "s" }} />
            </span>
          ))}
        </div>
        <div className="psh-lamp" aria-hidden="true" />
        <div className="psh-shade" aria-hidden="true" />
        <div className="psh-grain" aria-hidden="true" />
        <div className="psh-inner">
          <div className="psh-top">
            {eyebrow ? (
              <span className="psh-eyebrow psh-fade" style={{ transitionDelay: ".45s" }}>
                <i aria-hidden="true" />
                {eyebrow}
              </span>
            ) : null}
            <h1 className="psh-h">
              <span className="psh-line">
                <span style={{ transitionDelay: ".55s" }}>
                  {runs(title).map((r, j) => (r.em ? <em key={j}>{r.text}</em> : <React.Fragment key={j}>{r.text}</React.Fragment>))}
                </span>
              </span>
            </h1>
            {description ? (
              <p className="psh-desc psh-fade" style={{ transitionDelay: ".75s" }}>
                {description}
              </p>
            ) : null}
            {cta ? (
              React.createElement(
                cta.href ? "a" : "button",
                {
                  className: "psh-cta psh-fade",
                  style: { transitionDelay: ".9s" },
                  href: cta.href,
                  type: cta.href ? undefined : "button",
                  onClick: cta.onClick,
                },
                cta.label,
                <b key="b" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </b>,
              )
            ) : null}
          </div>
          {stats.length ? (
            <dl className="psh-stats psh-fade" style={{ transitionDelay: "1s", margin: 0 }}>
              {stats.map((s, i) => (
                <div className="psh-stat" key={i}>
                  <dt className="psh-lab" style={{ order: 2 }}>
                    {s.label}
                  </dt>
                  <dd className="psh-num" style={{ margin: 0 }} aria-label={formatStat(s.value, s.decimals, s.prefix, s.suffix)}>
                    {formatStat(s.value, s.decimals, s.prefix, s.suffix)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
      {logos.length ? (
        <div className="psh-band" aria-label="Customers">
          <div className="psh-track">
            {[0, 1].map((copy) =>
              logos.map((name, i) => (
                <span className="psh-mark" key={copy + "-" + i} aria-hidden={copy === 1 ? "true" : undefined} style={MARKS[i % MARKS.length]}>
                  {name}
                </span>
              )),
            )}
          </div>
        </div>
      ) : null}
      {statement ? (
        <div className="psh-say">
          {statementLabel ? <span className="psh-say-lab">{statementLabel}</span> : null}
          <p aria-label={statement}>
            {words(statement).map((w, i) => (
              <React.Fragment key={i}>
                <span className="psh-word" aria-hidden="true">
                  {w}
                </span>{" "}
              </React.Fragment>
            ))}
          </p>
        </div>
      ) : null}
    </section>
  )
}
