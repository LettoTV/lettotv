"use client";

import { useEffect, useState } from "react";

export default function EmberBackground() {
  const [embers, setEmbers] = useState([]);

  useEffect(() => {
    const generatedEmbers = Array.from(
      { length: 24 },
      (_, index) => {
        return {
          id: index,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 12}s`,
          duration: `${8 + Math.random() * 10}s`,
          scale: 0.45 + Math.random() * 1.1,
        };
      }
    );

    setEmbers(generatedEmbers);
  }, []);

  return (
    <div
      className="ember-field"
      aria-hidden="true"
    >
      {embers.map((ember) => {
        return (
          <span
            key={ember.id}
            className="ember"
            style={{
              left: ember.left,
              animationDelay: ember.delay,
              animationDuration: ember.duration,
              "--ember-scale": ember.scale,
            }}
          />
        );
      })}
    </div>
  );
}