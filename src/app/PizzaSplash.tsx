"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Tossing the dough…",
  "Ladling the sauce…",
  "Showering the cheese…",
  "Laying the pepperoni…",
  "Firing up the oven…",
  "Crisping the crust…",
  "Boxing it up hot…",
];

const START_DELAY = 1700; // let the pizza drop in before the bar starts filling

export default function PizzaSplash() {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [loadingMounted, setLoadingMounted] = useState(true);
  const [loadingOpacity, setLoadingOpacity] = useState(1);
  const [arcsMounted, setArcsMounted] = useState(false);

  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start the progress bar and rotating status messages after the drop-in.
  useEffect(() => {
    const startT = setTimeout(() => {
      progRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) return p;
          const step = 4 + Math.random() * 11;
          return Math.min(100, Math.round(p + step));
        });
      }, 240);

      msgRef.current = setInterval(() => {
        setMsgIndex((i) => i + 1);
      }, 1050);
    }, START_DELAY);

    return () => {
      clearTimeout(startT);
      if (progRef.current) clearInterval(progRef.current);
      if (msgRef.current) clearInterval(msgRef.current);
    };
  }, []);

  // The bar is full once it reaches 100 — derived, not stored.
  const done = progress >= 100;

  // When the bar fills, stop the loaders and sweep the arcs up to reveal home.
  useEffect(() => {
    if (!done) return;

    if (progRef.current) clearInterval(progRef.current);
    if (msgRef.current) clearInterval(msgRef.current);

    const timers = [
      setTimeout(() => setArcsMounted(true), 650),
      // hide the loading screen while the arcs fully cover it
      setTimeout(() => setLoadingOpacity(0), 650 + 900),
      setTimeout(() => setLoadingMounted(false), 650 + 1100),
      // arcs have exited the top — unmount the overlay
      setTimeout(() => setArcsMounted(false), 650 + 2050),
    ];
    return () => timers.forEach(clearTimeout);
  }, [done]);

  const statement = done
    ? "Fresh out the oven!"
    : MESSAGES[msgIndex % MESSAGES.length];
  const statementKey = done ? "done" : "m" + (msgIndex % MESSAGES.length);
  const swapDur = done ? "0.4s" : "1.05s";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        fontFamily: "var(--font-baloo), system-ui, sans-serif",
      }}
    >
      {/* ============ HOME PAGE (revealed underneath) ============ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#f6e7d4",
          overflow: "hidden",
        }}
      >
        {/* giant background word at bottom */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-7vh",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-luckiest), cursive",
            fontSize: "min(30vw, 380px)",
            lineHeight: 0.8,
            color: "#ffa920",
            letterSpacing: "4px",
            whiteSpace: "nowrap",
            zIndex: 0,
            userSelect: "none",
          }}
        >
          SLICE
        </div>

        {/* top nav */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "clamp(18px,2.6vw,34px) clamp(22px,3.4vw,54px)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-luckiest), cursive",
              fontSize: "clamp(34px,4.2vw,58px)",
              color: "#e92c2c",
              letterSpacing: "2px",
              textShadow: "2px 3px 0 rgba(0,0,0,0.12)",
            }}
          >
            SLICE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              style={{
                fontFamily: "var(--font-luckiest), cursive",
                letterSpacing: "1px",
                fontSize: "clamp(15px,1.4vw,20px)",
                color: "#fff4e0",
                background: "#e92c2c",
                border: "none",
                borderRadius: "999px",
                padding: "13px 28px",
                cursor: "pointer",
                boxShadow: "0 4px 0 #b51d1d",
              }}
            >
              PIZZAS
            </button>
            <button
              style={{
                fontFamily: "var(--font-luckiest), cursive",
                letterSpacing: "1px",
                fontSize: "clamp(15px,1.4vw,20px)",
                color: "#2a1a12",
                background: "transparent",
                border: "2.5px solid #2a1a12",
                borderRadius: "999px",
                padding: "11px 26px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              MENU
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "22px",
                    height: "3px",
                    background: "#2a1a12",
                    borderRadius: "2px",
                  }}
                />
                <span
                  style={{
                    width: "22px",
                    height: "3px",
                    background: "#2a1a12",
                    borderRadius: "2px",
                  }}
                />
                <span
                  style={{
                    width: "22px",
                    height: "3px",
                    background: "#2a1a12",
                    borderRadius: "2px",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* hero word */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 1,
            fontFamily: "var(--font-luckiest), cursive",
            fontSize: "min(23vw, 300px)",
            lineHeight: 0.82,
            color: "#e92c2c",
            letterSpacing: "2px",
            textAlign: "center",
            whiteSpace: "nowrap",
            WebkitTextStroke: "6px #fff4e0",
            paintOrder: "stroke fill",
            textShadow: "0 8px 0 rgba(0,0,0,0.10)",
          }}
        >
          THE PIZZA
        </div>

        {/* hero pizza */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pizza.png"
          alt="Pizza slice"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(34vw, 380px)",
            zIndex: 2,
            animation: "heroPizzaIn 0.8s cubic-bezier(.2,.8,.3,1.2) both",
            filter: "drop-shadow(0 24px 30px rgba(120,50,0,0.28))",
          }}
        />

        {/* badges */}
        <div
          style={
            {
              "--rot": "-13deg",
              position: "absolute",
              top: "30%",
              left: "24%",
              zIndex: 3,
              fontFamily: "var(--font-luckiest), cursive",
              color: "#fff4e0",
              background: "#ffa920",
              padding: "14px 20px",
              borderRadius: "16px",
              textAlign: "center",
              lineHeight: 1,
              fontSize: "clamp(15px,1.5vw,21px)",
              boxShadow: "0 6px 0 #d97e0c",
              transform: "rotate(-13deg)",
              animation: "badgeIn 0.5s 0.5s cubic-bezier(.2,.8,.3,1.4) both",
            } as CSSProperties
          }
        >
          WOOD
          <br />
          FIRED
        </div>
        <div
          style={
            {
              "--rot": "11deg",
              position: "absolute",
              top: "60%",
              right: "21%",
              zIndex: 3,
              fontFamily: "var(--font-luckiest), cursive",
              color: "#fff4e0",
              background: "#ffa920",
              padding: "14px 20px",
              borderRadius: "16px",
              textAlign: "center",
              lineHeight: 1,
              fontSize: "clamp(15px,1.5vw,21px)",
              boxShadow: "0 6px 0 #d97e0c",
              transform: "rotate(11deg)",
              animation: "badgeIn 0.5s 0.66s cubic-bezier(.2,.8,.3,1.4) both",
            } as CSSProperties
          }
        >
          HAND
          <br />
          TOSSED
        </div>

        {/* bottom copy columns */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(26px,4vh,52px)",
            left: "clamp(22px,3.4vw,54px)",
            maxWidth: "min(30vw, 360px)",
            zIndex: 4,
            fontWeight: 600,
            fontSize: "clamp(15px,1.25vw,19px)",
            lineHeight: 1.35,
            color: "#2a1a12",
            textWrap: "pretty",
          }}
        >
          Fired in a 900&deg; oven, our thin crust blisters and crackles under a
          blanket of San Marzano sauce.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "clamp(26px,4vh,52px)",
            right: "clamp(22px,3.4vw,54px)",
            maxWidth: "min(30vw, 360px)",
            zIndex: 4,
            textAlign: "right",
            fontWeight: 600,
            fontSize: "clamp(15px,1.25vw,19px)",
            lineHeight: 1.35,
            color: "#2a1a12",
            textWrap: "pretty",
          }}
        >
          Draped in fresh mozzarella and torn basil, hand-stretched daily to
          feed your cravings since 1997.
        </div>
      </div>

      {/* ============ LOADING SCREEN ============ */}
      {loadingMounted && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            background: "#ffa920",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: loadingOpacity,
            transition: "opacity 0.3s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "26px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "min(46vw, 460px)",
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "6%",
                  width: "42%",
                  height: "5%",
                  background: "#e07d0e",
                  borderRadius: "50%",
                  filter: "blur(2px)",
                  animation:
                    "shadowDrop 1.7s cubic-bezier(.34,1.4,.64,1) both, shadowPulse 3.4s ease-in-out 1.7s infinite",
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pizza.png"
                alt="Floating pizza slice"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  animation:
                    "pizzaDrop 1.7s linear both, pizzaFloat 3.4s ease-in-out 1.7s infinite",
                  willChange: "transform",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontFamily: "var(--font-luckiest), cursive",
                  color: "#fff4e0",
                  fontSize: "clamp(36px, 5.2vw, 64px)",
                  letterSpacing: "2px",
                  lineHeight: 1,
                  textShadow: "0 4px 0 rgba(199,108,0,0.45)",
                  WebkitTextStroke: "1px rgba(160,84,0,0.25)",
                }}
              >
                READY TO SLICE!
              </h1>
              <div
                key={statementKey}
                style={{
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  animation: `statementSwap ${swapDur} ease-in-out`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-luckiest), cursive",
                    color: "#9a5300",
                    fontSize: "clamp(15px, 1.7vw, 20px)",
                    letterSpacing: "1px",
                  }}
                >
                  {statement}
                </span>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "min(86vw, 760px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "14px",
                    background: "rgba(150,76,0,0.28)",
                    borderRadius: "999px",
                    overflow: "hidden",
                    boxShadow: "inset 0 1px 2px rgba(120,60,0,0.35)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progress}%`,
                      background: "linear-gradient(90deg,#fff4e0,#ffe7b3)",
                      borderRadius: "999px",
                      transition: "width 0.2s ease-out",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-luckiest), cursive",
                    color: "#fff4e0",
                    fontSize: "14px",
                    letterSpacing: "2px",
                    textShadow: "0 2px 0 rgba(199,108,0,0.4)",
                  }}
                >
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ TRANSITION ARCS ============ */}
      {arcsMounted && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          {[
            { background: "#ffa920", delay: "0s" },
            { background: "#ff7a1a", delay: "0.13s" },
            { background: "#e92c2c", delay: "0.26s" },
          ].map((arc) => (
            <div
              key={arc.background}
              style={{
                position: "absolute",
                bottom: 0,
                left: "-10%",
                width: "120%",
                height: "135vh",
                background: arc.background,
                borderRadius: "46% 46% 0 0 / 20% 20% 0 0",
                animation: `arcSweep 1.7s cubic-bezier(.7,0,.3,1) ${arc.delay} both`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
