"use client";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkDesktop = () => {
      if (typeof window !== undefined && window.innerWidth <= 768) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
      window.addEventListener("resize", checkDesktop);
      return window.removeEventListener("resize", checkDesktop);
    };
  }, []);
  return (
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={{
        backgroundColor: "transparent",
        fontSize: isDesktop ? "16px" : "12px",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
