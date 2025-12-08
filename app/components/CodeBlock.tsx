import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={{
        backgroundColor: "transparent",
        fontSize:
          typeof window !== undefined && window.innerWidth > 768
            ? "16px"
            : "12px",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
