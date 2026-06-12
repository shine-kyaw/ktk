// Demo placeholder catalog — the AG Holding team will replace these via the
// staff portal once the products API lands. Keep the shape API-friendly so
// swapping the source later is a one-line change.
export type DemoProduct = {
  id: string;
  name: string;
  category: "Transformers" | "Switchgear" | "Components";
  voltage: string;
  capacity: string;
  standard: string;
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: "tx-230-150", name: "Power Transformer 230 kV", category: "Transformers", voltage: "230 kV", capacity: "150 MVA", standard: "IEC 60076" },
  { id: "tx-132-90", name: "Power Transformer 132 kV", category: "Transformers", voltage: "132 kV", capacity: "90 MVA", standard: "IEC 60076" },
  { id: "tx-66-30", name: "Power Transformer 66 kV", category: "Transformers", voltage: "66 kV", capacity: "30 MVA", standard: "IEC 60076" },
  { id: "tx-33-10", name: "Distribution Transformer 33 kV", category: "Transformers", voltage: "33 kV", capacity: "10 MVA", standard: "IEC 60076" },
  { id: "tx-11-1600", name: "Distribution Transformer 11 kV", category: "Transformers", voltage: "11 kV", capacity: "1600 kVA", standard: "IEC 60076" },
  { id: "tx-pad-100", name: "Pad-Mount Transformer", category: "Transformers", voltage: "11 kV", capacity: "100 kVA", standard: "IEC 60076" },
  { id: "sw-unisafe", name: "UniSafe MV Switchgear", category: "Switchgear", voltage: "12 kV", capacity: "1250 A", standard: "ABB Licensed" },
  { id: "sw-epower", name: "System Pro E-Power LV Panel", category: "Switchgear", voltage: "0.4 kV", capacity: "4000 A", standard: "ABB Licensed" },
  { id: "sw-rmu", name: "Ring Main Unit", category: "Switchgear", voltage: "12 kV", capacity: "630 A", standard: "IEC 62271" },
  { id: "cp-ats", name: "Automatic Transfer Switch", category: "Components", voltage: "0.4 kV", capacity: "2500 A", standard: "IEC 60947" },
  { id: "cp-acb", name: "Air Circuit Breaker", category: "Components", voltage: "0.4 kV", capacity: "6300 A", standard: "IEC 60947" },
  { id: "cp-capbank", name: "Capacitor Bank", category: "Components", voltage: "11 kV", capacity: "5 MVAr", standard: "IEC 60871" },
];
