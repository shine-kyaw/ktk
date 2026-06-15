// Product anatomy, the material breakdown shown in <ProductAnatomyScroll />.
// Seed content shaped exactly like the future API response. Read through the
// async getter in src/lib/cms.ts; components never import this directly.
//
// IMPORTANT: the technical notes below are PLACEHOLDERS. Do not present them as
// confirmed specifications. Replace each `note` with verified data once KTK
// confirms the real materials, methods, and ratings for their cement bags.

export type BagLayerVariant = "print" | "lamination" | "woven" | "stitching" | "valve";

export type BagLayer = {
  id: string;
  /** Sort order, low number sits on the outside of the bag. */
  order: number;
  /** Headline name of the layer. */
  name: string;
  /** Short technical label, shown as the callout chip on the diagram. */
  tag: string;
  /** What the layer is and why it matters, for the reader. */
  description: string;
  /** Engineering note. PLACEHOLDER until KTK confirms real specs. */
  note: string;
  /** Visual key the diagram renders. Swap for an `image` field when art lands. */
  variant: BagLayerVariant;
  /** Optional photo/illustration path; when set, the diagram can use it. */
  image?: string | null;
  /** Where the callout sits relative to the layer on the diagram. */
  callout?: "left" | "right";
};

export type BagAnatomy = {
  eyebrow: string;
  title: string;
  intro: string;
  layers: BagLayer[];
  /** The reassembly message shown after the last layer. */
  closing: { title: string; body: string };
  /** Honest disclaimer rendered under the section while specs are unverified. */
  disclaimer?: string;
};

export const BAG_ANATOMY: BagAnatomy = {
  eyebrow: "Engineered for strength",
  title: "Inside the bag.",
  intro:
    "A KTK cement bag is not one material, it is a stack of them, each doing a job. Scroll to take it apart, layer by layer.",
  layers: [
    {
      id: "printed-branding",
      order: 1,
      name: "Printed outer layer",
      tag: "Outer surface",
      description:
        "Your brand printed sharp on the bag's outer face, up to six colors that stay legible through handling, stacking, and storage.",
      note: "Placeholder: confirm print method, color count, and ink durability with KTK.",
      variant: "print",
      callout: "right",
    },
    {
      id: "lamination",
      order: 2,
      name: "Moisture-resistant coating",
      tag: "Protective film",
      description:
        "A laminated film seals the woven surface against moisture, dust, and abrasion, keeping cement dry from the plant to the pour.",
      note: "Placeholder: confirm coating type and moisture rating with KTK.",
      variant: "lamination",
      callout: "left",
    },
    {
      id: "woven-pp",
      order: 3,
      name: "Woven polypropylene structure",
      tag: "Load-bearing core",
      description:
        "Tightly woven polypropylene tapes form the body of the bag, the layer that carries the load and resists tearing under weight.",
      note: "Placeholder: confirm tape denier, weave density, and tensile strength with KTK.",
      variant: "woven",
      callout: "right",
    },
    {
      id: "stitching",
      order: 4,
      name: "Reinforced stitching",
      tag: "Seams",
      description:
        "Reinforced seams hold the bag together at its weakest points, built to survive repeated lifting, stacking, and drops.",
      note: "Placeholder: confirm seam construction and sealing method with KTK.",
      variant: "stitching",
      callout: "left",
    },
    {
      id: "valve",
      order: 5,
      name: "Block-bottom valve",
      tag: "Filling structure",
      description:
        "A block-bottom valve lets the bag fill fast on automated lines and self-seals once packed, with no separate closing step.",
      note: "Placeholder: confirm valve type and fill-speed compatibility with KTK.",
      variant: "valve",
      callout: "right",
    },
  ],
  closing: {
    title: "Engineered to be trusted.",
    body: "Every layer has a job. Together they make a bag that protects what is inside, from our factory floor to yours.",
  },
  disclaimer:
    "Layer details are representative placeholders pending confirmation of KTK's verified product specifications.",
};
