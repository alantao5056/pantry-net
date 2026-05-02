"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X, Send, Sparkles, Loader2 } from "./icons";
import { PantryDocument } from "@/firebase/models/Pantry";

interface AISidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pantryData: PantryDocument[];
  onUpdateSearch: (address: string, radius: string) => void;
  onUpdateFilters: (filters: {
    openNow?: boolean;
    openDay?: string;
    foodTypes?: string[];
  }) => void;
}

export function AISidebar({
  isOpen,
  onClose,
  pantryData,
  onUpdateSearch,
  onUpdateFilters,
}: AISidebarProps) {
  const [inputValue, setInputValue] = useState("");
  
  const { messages, append, isLoading } = useChat({
    body: {
      pantryData,
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle tool calls to update parent state
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant" && lastMessage.toolInvocations) {
      lastMessage.toolInvocations.forEach((toolInvocation) => {
        if (toolInvocation.state === "result") {
          const { toolName, result } = toolInvocation;
          if (result && result.success) {
            if (toolName === "updateSearch") {
              onUpdateSearch(result.address, result.radius);
            } else if (toolName === "updateFilters") {
              const { success, ...filters } = result;
              onUpdateFilters(filters);
            }
          }
        }
      });
    }
  }, [messages, onUpdateSearch, onUpdateFilters]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const content = inputValue;
    setInputValue("");
    await append({
      role: "user",
      content: content,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-[400px] flex-col border-l border-pantry-stone bg-white shadow-2xl transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pantry-stone bg-pantry-dark px-5 py-4 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-pantry-bright" />
          <h2 className="font-serif text-lg font-bold">Pantry Assistant</h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-white/10"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-pantry-cream p-5 scrollbar-thin scrollbar-thumb-pantry-stone"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
            <div className="mb-4 rounded-full bg-white p-6 shadow-sm">
              <Sparkles size={40} className="text-pantry-dark" />
            </div>
            <p className="max-w-[240px] text-sm">
              Ask me to find pantries, filter results, or explain pantry details!
            </p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-pantry-dark text-white"
                    : "bg-white text-pantry-ink"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-sm prose-pantry max-w-none"
                >
                  {m.content || ""}
                </ReactMarkdown>
                
                {/* Tool feedback */}
                {m.toolInvocations?.map((ti) => (
                  <div key={ti.toolCallId} className="mt-2 border-t border-pantry-stone/30 pt-2 text-[11px] italic opacity-70">
                    {ti.state === "call" ? (
                      <span className="flex items-center gap-1">
                        <Loader2 size={10} className="animate-spin" />
                        Using tool: {ti.toolName}...
                      </span>
                    ) : (
                      <span>✓ Applied {ti.toolName}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (!messages.length || !messages[messages.length - 1]?.toolInvocations) && (
            <div className="flex items-start">
              <div className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm">
                <Loader2 size={16} className="animate-spin text-pantry-dark" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleFormSubmit}
        className="border-t border-pantry-stone bg-white p-4"
      >
        <div className="relative">
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="w-full rounded-xl border border-pantry-stone bg-pantry-cream px-4 py-3 pr-12 text-sm focus:border-pantry-dark focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-pantry-dark p-2 text-white hover:bg-pantry-medium disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
