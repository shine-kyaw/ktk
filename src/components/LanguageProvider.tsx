"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MYANMAR_TRANSLATIONS } from "@/content/translations";

type Locale = "en" | "my";
type LanguageContextValue = { locale: Locale; setLocale: (locale: Locale) => void };

const LanguageContext = createContext<LanguageContextValue>({ locale: "en", setLocale: () => undefined });
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translated(value: string, locale: Locale) {
  if (locale === "en") return value;
  const trimmed = value.trim();
  const replacement = MYANMAR_TRANSLATIONS[trimmed];
  return replacement ? value.replace(trimmed, replacement) : value;
}

function translateTree(root: ParentNode, locale: Locale) {
  // Two passes: first work out which parents end up holding real Burmese
  // replacements, then mutate text + the font-scoping attribute together.
  // A parent only gets the Myanmar font when it actually holds translated
  // text — otherwise English copy that has no dictionary entry (most
  // long-form content) would render in Noto Sans Myanmar instead of Archivo.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  const parentsNeedingMyanmarFont = new Set<Element>();
  let node = walker.nextNode();
  while (node) {
    const text = node as Text;
    const parent = text.parentElement;
    if (parent && !parent.closest("script, style, code, [data-no-translate]")) {
      if (!originalText.has(text)) originalText.set(text, text.data);
      const original = originalText.get(text) ?? text.data;
      const next = translated(original, locale);
      textNodes.push(text);
      if (locale === "my" && next !== original) parentsNeedingMyanmarFont.add(parent);
    }
    node = walker.nextNode();
  }
  textNodes.forEach((text) => {
    const parent = text.parentElement;
    if (!parent) return;
    text.data = translated(originalText.get(text) ?? text.data, locale);
    if (parentsNeedingMyanmarFont.has(parent)) parent.setAttribute("data-mm-text", "true");
    else parent.removeAttribute("data-mm-text");
  });

  const elements = root instanceof Element ? [root, ...root.querySelectorAll("[aria-label], [placeholder], [title]")] : [...root.querySelectorAll("[aria-label], [placeholder], [title]")];
  elements.forEach((element) => {
    const saved = originalAttributes.get(element) ?? new Map<string, string>();
    ["aria-label", "placeholder", "title"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;
      if (!saved.has(attribute)) saved.set(attribute, value);
      element.setAttribute(attribute, translated(saved.get(attribute) ?? value, locale));
    });
    originalAttributes.set(element, saved);
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const localeRef = useRef<Locale>("en");

  const setLocale = (next: Locale) => {
    localeRef.current = next;
    setLocaleState(next);
    localStorage.setItem("ktk-language", next);
  };

  useEffect(() => {
    const saved = localStorage.getItem("ktk-language");
    if (saved === "my") setLocale("my");
  }, []);

  useEffect(() => {
    localeRef.current = locale;
    document.documentElement.lang = locale === "my" ? "my" : "en";
    document.documentElement.dataset.locale = locale;
    translateTree(document.body, locale);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.parentNode) translateTree(node.parentNode, localeRef.current);
        if (node.nodeType === Node.ELEMENT_NODE) translateTree(node as Element, localeRef.current);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
