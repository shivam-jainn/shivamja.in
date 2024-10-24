import { useEffect, useRef } from 'react';
import Clipboard from 'clipboard';

export default function CopyCode({ children }: { children: string }) {
  const codeRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const clipboard = new Clipboard('.copy-button', {
      text: () => codeRef.current?.innerText || '',
    });

    return () => clipboard.destroy();
  }, []);

  return (
    <div className="relative mb-4">
      <button className="copy-button absolute right-2 top-2 bg-gray-800 text-white px-2 py-1 text-sm rounded hover:bg-gray-700">
        Copy
      </button>
      <pre ref={codeRef} className="p-4 bg-gray-900 rounded-lg overflow-auto text-white">
        <code>{children}</code>
      </pre>
    </div>
  );
}
