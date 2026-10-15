/*
 * October 2026 copy pass: public text that had been written as internal notes
 * ("the supplied archive", "authorization record displayed with its stated
 * dates", "KTK asked that unverified claims remain unpublished") rewritten as
 * customer-facing copy. No fact, date, figure or claim changes; only framing.
 *
 * Used twice:
 * - the 20261009 migration replaces these in the CMS database, but only where
 *   a field still holds the old text exactly, so nothing an editor has changed
 *   is overwritten;
 * - the source files and the Burmese dictionary were updated from the same
 *   list, so seed data, fallbacks and translations agree with the database.
 *
 * `my` is the Burmese for the new English (flagged for native review with the
 * rest of the dictionary).
 */
export type CopyChange = { from: string; to: string; my: string };

export const CUSTOMER_COPY_2026_10: CopyChange[] = [
  // ── Products ──────────────────────────────────────────────────────────────
  {
    from: "Block-bottom woven valve sacks for cement and powdered products, presented in the supplied AD*STAR artwork set.",
    to: "Block-bottom woven valve sacks for cement and powdered products, built for automated filling and clean stacking.",
    my: "ဘိလပ်မြေနှင့် အမှုန့်ထုတ်ကုန်များအတွက် Block-bottom ရက်လုပ် Valve အိတ်များ — အလိုအလျောက်ဖြည့်သွင်းမှုနှင့် သပ်ရပ်စွာထပ်စီနိုင်ရန် ပြုလုပ်ထားပါသည်။",
  },
  {
    from: "The supplied AD*STAR artwork shows a structured woven valve sack format designed for automated filling and clean stacking. KTK can support artwork-led packaging discussions around dimensions, print, capacity, and filling-line requirements.",
    to: "A structured, block-bottom woven valve sack designed for automated filling and clean, stable stacking. KTK works through dimensions, print, capacity, and filling-line requirements with you before production.",
    my: "အလိုအလျောက်ဖြည့်သွင်းမှုနှင့် သပ်ရပ်တည်ငြိမ်စွာ ထပ်စီနိုင်ရန် ဒီဇိုင်းထုတ်ထားသော Block-bottom ရက်လုပ် Valve အိတ်။ ထုတ်လုပ်မှုမစမီ အရွယ်အစား၊ ပုံနှိပ်မှု၊ ဝင်ဆံ့ပမာဏနှင့် ဖြည့်သွင်းလိုင်းလိုအပ်ချက်များကို KTK က သင်နှင့်အတူ အတည်ပြုပေးပါသည်။",
  },
  {
    from: "The supplied artwork demonstrates how a finished cement sack can carry strong front and side branding.",
    to: "Flat, square faces give a finished cement sack strong front and side branding.",
    my: "ပြားပြီး လေးထောင့်ကျသော မျက်နှာပြင်များကြောင့် ဘိလပ်မြေအိတ်၏ ရှေ့နှင့်ဘေးဘက်တွင် အမှတ်တံဆိပ်ကို ထင်ရှားစွာ ဖော်ပြနိုင်ပါသည်။",
  },
  {
    from: "Standard PP woven bags are built for dependable bulk handling where breathable woven fabric is the right fit. The supplied general product set shows rice, food, and agricultural packaging examples; final size, construction, and print artwork are confirmed per order.",
    to: "Standard PP woven bags are built for dependable bulk handling where breathable woven fabric is the right fit, from rice and food to agricultural products. Size, construction, and print artwork are confirmed for every order.",
    my: "လေဝင်လေထွက်ကောင်းသော ရက်လုပ်အထည်လိုအပ်သည့် ဆန်၊ စားသောက်ကုန်နှင့် စိုက်ပျိုးရေးထုတ်ကုန်များကို ယုံကြည်စိတ်ချစွာ အစုလိုက်ကိုင်တွယ်နိုင်ရန် စံ PP ရက်လုပ်အိတ်များကို ပြုလုပ်ထားပါသည်။ အရွယ်အစား၊ တည်ဆောက်ပုံနှင့် ပုံနှိပ်ဒီဇိုင်းကို အော်ဒါတိုင်းအတွက် အတည်ပြုပေးပါသည်။",
  },
  { from: "Quality records", to: "Quality documents", my: "အရည်အသွေးစာရွက်စာတမ်းများ" },
  {
    from: "Laminated PP woven bags feature an extrusion-coated protective layer over the woven substrate to seal the weave and form an effective moisture barrier. The supplied lamination set shows feed, pet food, and fine-product packaging examples; barrier performance and final structure are customized to suit your product and filling environment.",
    to: "Laminated PP woven bags feature an extrusion-coated protective layer over the woven substrate to seal the weave and form an effective moisture barrier. They suit feed, pet food, and fine powders; barrier performance and final structure are tailored to your product and filling environment.",
    my: "Laminated PP ရက်လုပ်အိတ်များတွင် ရက်ကွက်ကိုပိတ်ပြီး ထိရောက်သော အစိုဓာတ်ကာကွယ်လွှာဖြစ်စေရန် ရက်လုပ်အခြေခံအပေါ်တွင် Extrusion-coated ကာကွယ်လွှာ ပါဝင်ပါသည်။ အစာ၊ အိမ်မွေးတိရစ္ဆာန်အစာနှင့် အမှုန့်ချောများအတွက် သင့်တော်ပြီး ကာကွယ်နိုင်စွမ်းနှင့် နောက်ဆုံးတည်ဆောက်ပုံကို သင့်ထုတ်ကုန်နှင့် ဖြည့်သွင်းပတ်ဝန်းကျင်အလိုက် ချိန်ညှိပေးပါသည်။",
  },
  {
    from: "BOPP laminated bags combine a high-strength PP woven base with an outer reverse-printed film layer, delivering premium photo-quality graphics alongside superior moisture and puncture resistance. The supplied BOPP set shows colorful retail and food packaging examples; finish, artwork, and dimensions are custom-tailored around your intended shelf presentation.",
    to: "BOPP laminated bags combine a high-strength PP woven base with an outer reverse-printed film layer, delivering premium photo-quality graphics alongside superior moisture and puncture resistance. Made for colorful retail and food packaging; finish, artwork, and dimensions are tailored to how your product sits on the shelf.",
    my: "BOPP Laminated အိတ်များသည် ခိုင်ခံ့သော PP ရက်လုပ်အခြေခံနှင့် နောက်ကျောဘက်မှပုံနှိပ်ထားသော အပြင်ဖလင်လွှာကို ပေါင်းစပ်ထားပြီး ဓာတ်ပုံအရည်အသွေးမြင့် ပုံနှိပ်မှုနှင့်အတူ အစိုဓာတ်နှင့် ထိုးဖောက်မှုကို ကောင်းစွာခံနိုင်ပါသည်။ အရောင်စုံ လက်လီနှင့် စားသောက်ကုန်ထုပ်ပိုးမှုအတွက် ပြုလုပ်ထားပြီး အပြီးသတ်၊ ဒီဇိုင်းနှင့် အရွယ်အစားကို စင်ပေါ်တွင် ထုတ်ကုန်ပြသပုံအလိုက် ချိန်ညှိပေးပါသည်။",
  },
  { from: "Protection stated", to: "Protection", my: "ကာကွယ်မှု" },
  { from: "Tests stated", to: "Tests", my: "စမ်းသပ်မှုများ" },
  {
    from: "The supplied technical sheet covers PE filler for film and bottles, PP filler for woven bags, raffia, molding and nonwoven, transparent filler for clarity-sensitive packaging, and thermoforming filler for PS or PP sheet. Select the grade and dosage against the polymer, process temperature, and target finish.",
    to: "The range covers PE filler for film and bottles, PP filler for woven bags, raffia, molding and nonwoven, transparent filler for clarity-sensitive packaging, and thermoforming filler for PS or PP sheet. Grade and dosage are selected against the polymer, process temperature, and target finish.",
    my: "ဖလင်နှင့် ပုလင်းအတွက် PE Filler၊ ရက်လုပ်အိတ်၊ Raffia၊ Molding နှင့် Nonwoven အတွက် PP Filler၊ ကြည်လင်မှုလိုအပ်သော ထုပ်ပိုးမှုအတွက် Transparent Filler နှင့် PS သို့မဟုတ် PP Sheet အတွက် Thermoforming Filler တို့ ပါဝင်ပါသည်။ Polymer၊ လုပ်ငန်းစဉ်အပူချိန်နှင့် လိုချင်သောအပြီးသတ်အလိုက် အဆင့်နှင့် ထည့်သွင်းနှုန်းကို ရွေးချယ်ပေးပါသည်။",
  },
  {
    from: "The supplied image set includes color material examples for a visual starting point.",
    to: "Color material examples give a visual starting point for your shade.",
    my: "အရောင်ပစ္စည်းနမူနာများက သင်လိုချင်သောအရောင်အတွက် စတင်ရွေးချယ်ရန် အထောက်အကူပြုပါသည်။",
  },
  {
    from: "Supplied 10S/3 polyester thread analysis for the 200 g format, inspected 5 May 2026 against ISO 9001:2015.",
    to: "10S/3 polyester thread analysis for the 200 g format, inspected 5 May 2026 against ISO 9001:2015.",
    my: "200 g အရွယ်အတွက် 10S/3 Polyester အပ်ချည်စစ်ဆေးချက် — ၂၀၂၆ ခုနှစ် မေ ၅ ရက်တွင် ISO 9001:2015 နှင့်အညီ စစ်ဆေးထားပါသည်။",
  },
  {
    from: "Supplied 10S/3 polyester thread analysis for the 1 kg format, inspected 5 May 2026 against ISO 9001:2015.",
    to: "10S/3 polyester thread analysis for the 1 kg format, inspected 5 May 2026 against ISO 9001:2015.",
    my: "1 kg အရွယ်အတွက် 10S/3 Polyester အပ်ချည်စစ်ဆေးချက် — ၂၀၂၆ ခုနှစ် မေ ၅ ရက်တွင် ISO 9001:2015 နှင့်အညီ စစ်ဆေးထားပါသည်။",
  },
  {
    from: "The supplied thread document covering 100% polyester construction and all stated performance values.",
    to: "Thread specification covering the 100% polyester construction and its performance values.",
    my: "100% Polyester တည်ဆောက်ပုံနှင့် စွမ်းဆောင်ရည်တန်ဖိုးများပါဝင်သော အပ်ချည်သတ်မှတ်ချက်။",
  },
  {
    from: "Supplied polyester thread construction, strength, elongation, twist, roll length, weight, and color record.",
    to: "Polyester thread construction, strength, elongation, twist, roll length, weight, and color.",
    my: "Polyester အပ်ချည်၏ တည်ဆောက်ပုံ၊ ခိုင်မာမှု၊ ဆန့်နိုင်မှု၊ လိမ်အား၊ လိပ်အလျား၊ အလေးချိန်နှင့် အရောင်။",
  },
  { from: "NEWLONG Authorization Record", to: "NEWLONG Authorization Certificate", my: "NEWLONG ကိုယ်စားလှယ်ခွင့်လက်မှတ်" },
  {
    from: "The supplied NEWLONG authorization record naming KTK Co., Ltd.",
    to: "NEWLONG's authorization naming KTK Co., Ltd. as its Myanmar zone agent.",
    my: "KTK Co., Ltd. ကို မြန်မာဇုန်ကိုယ်စားလှယ်အဖြစ် ခန့်အပ်ထားသော NEWLONG ကိုယ်စားလှယ်ခွင့်။",
  },
  {
    from: "Supplied NEWLONG Industrial Co., Ltd. zone-agent authorization record for KTK Co., Ltd.",
    to: "NEWLONG Industrial Co., Ltd. zone-agent authorization for KTK Co., Ltd.",
    my: "KTK Co., Ltd. အတွက် NEWLONG Industrial Co., Ltd. ၏ ဇုန်ကိုယ်စားလှယ်ခွင့်။",
  },
  {
    from: "The supplied NEWLONG set includes portable and standalone sewing heads as well as the KS16 conveyor system. KTK can help match the machine format to the bag, line speed, filling environment, and service requirements.",
    to: "The NEWLONG range includes portable and standalone sewing heads as well as the KS16 conveyor system. KTK helps match the machine format to your bag, line speed, filling environment, and service needs.",
    my: "NEWLONG အမျိုးအစားများတွင် သယ်ယူနိုင်သောနှင့် သီးသန့်ချုပ်စက်ခေါင်းများအပြင် KS16 Conveyor စနစ် ပါဝင်ပါသည်။ သင့်အိတ်၊ လိုင်းအမြန်နှုန်း၊ ဖြည့်သွင်းပတ်ဝန်းကျင်နှင့် ဝန်ဆောင်မှုလိုအပ်ချက်များနှင့် ကိုက်ညီသော စက်အမျိုးအစားကို KTK က ရွေးချယ်ပေးပါသည်။",
  },
  {
    from: "KTK supports parts, maintenance, and repair around the supplied equipment range.",
    to: "KTK supports parts, maintenance, and repair across the NEWLONG range.",
    my: "NEWLONG စက်အမျိုးအစားအားလုံးအတွက် အပိုပစ္စည်း၊ ပြုပြင်ထိန်းသိမ်းမှုနှင့် ပြင်ဆင်မှုကို KTK က ပံ့ပိုးပေးပါသည်။",
  },
  {
    from: "The supplied YAO HAN set includes conveyor, automatic, and portable machine references. KTK presents the actual models and leaves capacity, configuration, and line suitability to a proper inquiry rather than inventing specifications from the photographs.",
    to: "The YAO HAN range includes conveyor, automatic, and portable bag-closing machines. Capacity, configuration, and line suitability depend on your bag and filling line, so KTK confirms them with you before you order.",
    my: "YAO HAN အမျိုးအစားများတွင် Conveyor၊ အလိုအလျောက်နှင့် သယ်ယူနိုင်သော အိတ်ချုပ်စက်များ ပါဝင်ပါသည်။ ဝင်ဆံ့ပမာဏ၊ ဖွဲ့စည်းပုံနှင့် လိုင်းကိုက်ညီမှုသည် သင့်အိတ်နှင့် ဖြည့်သွင်းလိုင်းပေါ်တွင် မူတည်သောကြောင့် မှာယူမီ KTK က သင်နှင့်အတူ အတည်ပြုပေးပါသည်။",
  },
  { from: "A broad supplied set", to: "A broad range", my: "အမျိုးအစားစုံလင်မှု" },
  {
    from: "The supplied bearing document identifies deep-groove ball bearings and tapered roller bearings, and describes HCH’s quality systems and manufacturing capability. KTK has distributed HCH bearing products in Myanmar since 2008; confirm the exact series and dimensions for your application.",
    to: "HCH’s range covers deep-groove ball bearings and tapered roller bearings, backed by the manufacturer’s quality systems and production capability. KTK has distributed HCH bearing products in Myanmar since 2008; confirm the exact series and dimensions for your application.",
    my: "HCH ၏ အမျိုးအစားများတွင် Deep-groove Ball Bearing နှင့် Tapered Roller Bearing များ ပါဝင်ပြီး ထုတ်လုပ်သူ၏ အရည်အသွေးစနစ်နှင့် ထုတ်လုပ်နိုင်စွမ်းဖြင့် ကျောထောက်နောက်ခံပြုထားပါသည်။ KTK သည် ၂၀၀၈ ခုနှစ်မှစ၍ မြန်မာနိုင်ငံတွင် HCH Bearing ထုတ်ကုန်များကို ဖြန့်ချိလာခဲ့ပါသည်။ သင့်အသုံးပြုမှုအတွက် Series နှင့် အရွယ်အစားအတိအကျကို အတည်ပြုပါ။",
  },
  { from: "Authorization record", to: "Authorization", my: "ကိုယ်စားလှယ်ခွင့်" },
  {
    from: "Supplied sole-distributor certificate: 1 Mar 2025–28 Feb 2026",
    to: "Sole-distributor certificate, 1 Mar 2025 – 28 Feb 2026",
    my: "တစ်ခုတည်းသောဖြန့်ချိရေးကိုယ်စားလှယ်လက်မှတ်၊ ၂၀၂၅ မတ် ၁ – ၂၀၂၆ ဖေဖော်ဝါရီ ၂၈",
  },
  {
    from: "The supplied gallery separates deep-groove and tapered roller bearing references.",
    to: "Deep-groove ball and tapered roller formats, shown side by side.",
    my: "Deep-groove Ball နှင့် Tapered Roller အမျိုးအစားများကို ဘေးချင်းယှဉ်ပြသထားပါသည်။",
  },
  {
    from: "The supplied TR archive includes spherical roller and unit bearing references, plus a product photography set. The companion document describes TR’s bearing-unit and spherical-roller range; confirm dimensions, seals, load requirements, and availability with KTK.",
    to: "TR’s range covers spherical roller bearings and mounted bearing units for equipment applications. Confirm dimensions, seals, load requirements, and availability with KTK.",
    my: "TR ၏ အမျိုးအစားများတွင် စက်ပစ္စည်းအသုံးပြုမှုအတွက် Spherical Roller Bearing နှင့် Mounted Bearing Unit များ ပါဝင်ပါသည်။ အရွယ်အစား၊ Seal၊ ဝန်အားလိုအပ်ချက်နှင့် ရရှိနိုင်မှုကို KTK နှင့် အတည်ပြုပါ။",
  },
  {
    from: "Supplied appointment states validity begins 18 Oct 2026",
    to: "Official distributor appointment, valid from 18 Oct 2026",
    my: "တရားဝင်ဖြန့်ချိရေးကိုယ်စားလှယ်ခန့်အပ်မှု၊ ၂၀၂၆ အောက်တိုဘာ ၁၈ မှစ၍ သက်တမ်းရှိ",
  },
  {
    from: "The supplied image set includes sealed unit-bearing formats for equipment applications.",
    to: "Sealed unit-bearing formats for equipment applications.",
    my: "စက်ပစ္စည်းအသုံးပြုမှုအတွက် Seal ပါသော Unit-bearing အမျိုးအစားများ။",
  },

  // ── Activities ────────────────────────────────────────────────────────────
  { from: "Company archive", to: "Company event", my: "ကုမ္ပဏီပွဲ" },
  { from: "New supplied archive", to: "Recent", my: "မကြာသေးမီက" },
  {
    from: "A team gathering from KTK's supplied company activity archive.",
    to: "KTK colleagues together at a team gathering.",
    my: "အဖွဲ့စုပေါင်းတွေ့ဆုံပွဲတွင် စုဝေးနေသော KTK လုပ်ဖော်ကိုင်ဖက်များ။",
  },
  {
    from: "A supplied KTK programme, group dinner, and team activity archive.",
    to: "A KTK programme, group dinner, and team activity.",
    my: "KTK အစီအစဉ်၊ စုပေါင်းညစာနှင့် အဖွဲ့လိုက်လှုပ်ရှားမှု။",
  },
  { from: "Company Outing Archive", to: "Company Outing", my: "ကုမ္ပဏီအပြင်ထွက်လှုပ်ရှားမှု" },
  {
    from: "Group photographs from a supplied KTK company outing and staff gathering.",
    to: "Group photographs from a KTK company outing and staff gathering.",
    my: "KTK ကုမ္ပဏီအပြင်ထွက်လှုပ်ရှားမှုနှင့် ဝန်ထမ်းစုပေါင်းတွေ့ဆုံပွဲမှ စုပေါင်းဓာတ်ပုံများ။",
  },
  {
    from: "Representative photographs from the supplied staff COVID-19 health and vaccination activity. The full source archive remains linked below.",
    to: "Photographs from KTK’s staff COVID-19 health and vaccination programme. The full album is linked below.",
    my: "KTK ဝန်ထမ်း COVID-19 ကျန်းမာရေးနှင့် ကာကွယ်ဆေးထိုးအစီအစဉ်မှ ဓာတ်ပုံများ။ ဓာတ်ပုံအစုံအလင်ကို အောက်တွင် ချိတ်ဆက်ထားပါသည်။",
  },
  {
    from: "A supplied team dinner archive with group photographs and a short celebration video.",
    to: "A KTK team dinner, with group photographs and a short celebration video.",
    my: "စုပေါင်းဓာတ်ပုံများနှင့် အတိုချုံးအောင်ပွဲဗီဒီယိုပါဝင်သော KTK အဖွဲ့လိုက်ညစာ။",
  },
  {
    from: "The latest company-outing and team-activity photographs supplied by KTK.",
    to: "Photographs from KTK’s latest company outing and team activities.",
    my: "KTK ၏ နောက်ဆုံး ကုမ္ပဏီအပြင်ထွက်ပွဲနှင့် အဖွဲ့လှုပ်ရှားမှုများမှ ဓာတ်ပုံများ။",
  },
  {
    from: "A newly supplied photograph from KTK's golf and community programme.",
    to: "From KTK’s golf and community programme.",
    my: "KTK ၏ ဂေါက်သီးနှင့် လူမှုအသိုင်းအဝိုင်းအစီအစဉ်မှ။",
  },
  {
    from: "Recent team programmes, staff gatherings, and company celebrations supplied by KTK.",
    to: "Recent KTK team programmes, staff gatherings, and company celebrations.",
    my: "မကြာသေးမီက KTK အဖွဲ့အစီအစဉ်များ၊ ဝန်ထမ်းစုဝေးပွဲများနှင့် ကုမ္ပဏီအခမ်းအနားများ။",
  },
  {
    from: "KTK team members and recognition recipients photographed at a supplied company event.",
    to: "KTK team members and recognition recipients at a company event.",
    my: "ကုမ္ပဏီပွဲတစ်ခုတွင် KTK အဖွဲ့ဝင်များနှင့် ဂုဏ်ပြုခံရသူများ။",
  },
  {
    from: "A supplied KTK and San Kaung company-event film featuring company representatives, manufacturing footage, and the Novotel event venue.",
    to: "A KTK and San Kaung company-event film with company representatives, manufacturing footage, and the Novotel event venue.",
    my: "ကုမ္ပဏီကိုယ်စားလှယ်များ၊ ထုတ်လုပ်ရေးမြင်ကွင်းများနှင့် Novotel ပွဲကျင်းပရာနေရာ ပါဝင်သော KTK နှင့် San Kaung ကုမ္ပဏီပွဲဗီဒီယို။",
  },
  {
    from: "Ribbon-cutting and group photographs from a supplied Kaung Thu Kha company-opening archive.",
    to: "Ribbon-cutting and group photographs from a Kaung Thu Kha company opening.",
    my: "ကောင်းသုခကုမ္ပဏီဖွင့်ပွဲမှ ဖဲကြိုးလှီးပွဲနှင့် စုပေါင်းဓာတ်ပုံများ။",
  },
  {
    from: "KTK representatives photographed on stage during a supplied corporate recognition event.",
    to: "KTK representatives on stage at a corporate recognition event.",
    my: "လုပ်ငန်းဆိုင်ရာဂုဏ်ပြုပွဲတွင် စင်မြင့်ပေါ်ရှိ KTK ကိုယ်စားလှယ်များ။",
  },
  {
    from: "The supplied KTK commercial film, retained in Google Drive for streaming at its original quality.",
    to: "KTK’s commercial film, streamed at its original quality.",
    my: "မူရင်းအရည်အသွေးအတိုင်း ပြသထားသော KTK ကြော်ငြာဗီဒီယို။",
  },
  {
    from: "A supplied commercial production retained in Google Drive for streaming at its original quality.",
    to: "A KTK commercial production, streamed at its original quality.",
    my: "မူရင်းအရည်အသွေးအတိုင်း ပြသထားသော KTK ကြော်ငြာဗီဒီယို။",
  },
  {
    from: "The supplied HCH commercial production retained in Google Drive for viewing at its original quality.",
    to: "The HCH commercial production, streamed at its original quality.",
    my: "မူရင်းအရည်အသွေးအတိုင်း ပြသထားသော HCH ကြော်ငြာဗီဒီယို။",
  },
  {
    from: "A newly supplied KTK AI commercial, streamed from the original Google Drive file.",
    to: "KTK’s new AI-produced commercial, streamed at its original quality.",
    my: "မူရင်းအရည်အသွေးအတိုင်း ပြသထားသော KTK ၏ AI ဖြင့်ပြုလုပ်ထားသည့် ကြော်ငြာဗီဒီယိုအသစ်။",
  },

  // ── Certificates, history, partners ──────────────────────────────────────
  {
    from: "Sole-distributor appointment for bag-closing machine series and S8 series in Myanmar. The supplied certificate covers 1 September 2024 through 31 October 2025 and is displayed as an authorization record.",
    to: "Sole-distributor appointment for YAO HAN bag-closing machine series and S8 series in Myanmar, valid 1 September 2024 to 31 October 2025.",
    my: "မြန်မာနိုင်ငံအတွင်း YAO HAN အိတ်ချုပ်စက်အမျိုးအစားများနှင့် S8 အမျိုးအစားအတွက် တစ်ခုတည်းသောဖြန့်ချိရေးကိုယ်စားလှယ် ခန့်အပ်မှု၊ ၂၀၂၄ ခုနှစ် စက်တင်ဘာ ၁ ရက်မှ ၂၀၂၅ ခုနှစ် အောက်တိုဘာ ၃၁ ရက်အထိ သက်တမ်းရှိ။",
  },
  {
    from: "Sole-distributor authorization for HCH brand bearings in Myanmar, including marketing, promotion, sales, and technical service. The supplied certificate covers 1 March 2025 through 28 February 2026.",
    to: "Sole-distributor authorization for HCH brand bearings in Myanmar, including marketing, promotion, sales, and technical service, valid 1 March 2025 to 28 February 2026.",
    my: "မြန်မာနိုင်ငံအတွင်း HCH အမှတ်တံဆိပ် Bearing များအတွက် စျေးကွက်ရှာဖွေမှု၊ အရောင်းမြှင့်တင်မှု၊ အရောင်းနှင့် နည်းပညာဝန်ဆောင်မှုအပါအဝင် တစ်ခုတည်းသောဖြန့်ချိရေးကိုယ်စားလှယ်ခွင့်၊ ၂၀၂၅ ခုနှစ် မတ် ၁ ရက်မှ ၂၀၂၆ ခုနှစ် ဖေဖော်ဝါရီ ၂၈ ရက်အထိ သက်တမ်းရှိ။",
  },
  {
    from: "Official distributor appointment for the registered TR brand in Myanmar. The supplied certificate states a two-year validity beginning 18 October 2026.",
    to: "Official distributor appointment for the registered TR brand in Myanmar, valid for two years from 18 October 2026.",
    my: "မြန်မာနိုင်ငံအတွင်း မှတ်ပုံတင်ထားသော TR အမှတ်တံဆိပ်အတွက် တရားဝင်ဖြန့်ချိရေးကိုယ်စားလှယ် ခန့်အပ်မှု၊ ၂၀၂၆ ခုနှစ် အောက်တိုဘာ ၁၈ ရက်မှစ၍ နှစ်နှစ်သက်တမ်းရှိ။",
  },
  {
    from: "The supplied NEWLONG authorization records KTK as a Myanmar zone agent from 20 February 2009.",
    to: "KTK is appointed NEWLONG’s zone agent for Myanmar from 20 February 2009.",
    my: "၂၀၀၉ ခုနှစ် ဖေဖော်ဝါရီ ၂၀ ရက်မှစ၍ KTK သည် NEWLONG ၏ မြန်မာဇုန်ကိုယ်စားလှယ်အဖြစ် ခန့်အပ်ခံရပါသည်။",
  },
  {
    from: "KTK developed its YAO HAN machinery offering; the supplied authorization archive includes a later appointment covering September 2024 through October 2025.",
    to: "KTK adds YAO HAN bag-closing machinery to its range, later serving as YAO HAN’s sole distributor in Myanmar from September 2024 to October 2025.",
    my: "KTK သည် YAO HAN အိတ်ချုပ်စက်များကို ၎င်း၏ထုတ်ကုန်အမျိုးအစားများတွင် ထည့်သွင်းခဲ့ပြီး နောက်ပိုင်းတွင် ၂၀၂၄ ခုနှစ် စက်တင်ဘာမှ ၂၀၂၅ ခုနှစ် အောက်တိုဘာအထိ မြန်မာနိုင်ငံရှိ YAO HAN ၏ တစ်ခုတည်းသောဖြန့်ချိရေးကိုယ်စားလှယ်အဖြစ် ဆောင်ရွက်ခဲ့ပါသည်။",
  },
  { from: "Resin source stated in the supplied PP product records", to: "PP resin for KTK’s woven bags", my: "KTK ရက်လုပ်အိတ်များအတွက် PP Resin" },
  {
    from: "Bearing supply · authorization record displayed with its stated dates",
    to: "Bearings · distributed by KTK in Myanmar since 2008",
    my: "Bearing · ၂၀၀၈ ခုနှစ်မှစ၍ မြန်မာနိုင်ငံတွင် KTK မှ ဖြန့်ချိ",
  },
  {
    from: "Bag-closing machinery and thread · Myanmar zone-agent record since 2009",
    to: "Bag-closing machinery and thread · Myanmar zone agent since 2009",
    my: "အိတ်ချုပ်စက်နှင့် အပ်ချည် · ၂၀၀၉ ခုနှစ်မှစ၍ မြန်မာဇုန်ကိုယ်စားလှယ်",
  },
  {
    from: "Bag-closing machinery · authorization record displayed with its stated dates",
    to: "Bag-closing machinery · in KTK’s range since 2013",
    my: "အိတ်ချုပ်စက်ပစ္စည်း · ၂၀၁၃ ခုနှစ်မှစ၍ KTK ထုတ်ကုန်အမျိုးအစားတွင် ပါဝင်",
  },
];
