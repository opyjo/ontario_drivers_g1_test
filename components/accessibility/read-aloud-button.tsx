"use client";

import { useEffect, useState } from "react";
import { Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReadAloudButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function ReadAloudButton({
  text,
  label = "Read aloud",
  className,
}: Readonly<ReadAloudButtonProps>) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(
      "speechSynthesis" in window && "SpeechSynthesisUtterance" in window
    );
    return () => window.speechSynthesis?.cancel();
  }, [text]);

  const toggleSpeech = () => {
    if (!supported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-CA";
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!supported) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={toggleSpeech}
      aria-pressed={speaking}
    >
      {speaking ? (
        <Square className="h-4 w-4 fill-current" aria-hidden="true" />
      ) : (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      )}
      {speaking ? "Stop reading" : label}
    </Button>
  );
}
