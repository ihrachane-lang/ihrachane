export const servicePages = {
  sourcing: {
    title: "China Sourcing & Supplier Verification",
    description: "Find and verify suitable manufacturers with IHRACHANE's managed China sourcing service.",
    keywords: ["China sourcing agent", "supplier verification China", "China product sourcing", "manufacturer sourcing service"],
    turkishSlug: "cin-tedarik",
    turkishTitle: "Çin Tedarik ve Tedarikçi Bulma Hizmeti",
    turkishDescription: "IHRACHANE ile Çin'de güvenilir üretici ve tedarikçi bulun, doğrulayın ve satın alma sürecini yönetin.",
  },
  "quality-inspection": {
    title: "Factory Audit & Quality Inspection",
    description: "Reduce sourcing risk with supplier audits, in-line inspections and pre-shipment quality control.",
    keywords: ["factory audit China", "quality inspection service", "pre shipment inspection", "supplier audit"],
    turkishSlug: "cin-fabrika-denetimi",
    turkishTitle: "Çin Fabrika Denetimi ve Kalite Kontrol",
    turkishDescription: "Fabrika denetimi, üretim takibi ve sevkiyat öncesi kalite kontrol ile tedarik riskini azaltın.",
  },
  "china-to-turkey-freight": {
    title: "China to Turkey Freight & Consolidation",
    description: "Coordinate China warehousing, consolidation and international freight to Turkey with one accountable partner.",
    keywords: ["China to Turkey freight", "China Turkey logistics", "China warehouse consolidation", "international freight forwarding"],
    turkishSlug: "cinden-turkiyeye-lojistik",
    turkishTitle: "Çin'den Türkiye'ye Lojistik ve Konsolidasyon",
    turkishDescription: "Çin depo, konsolidasyon ve Türkiye'ye uluslararası navlun süreçlerini tek ekip ile yönetin.",
  },
};

export const turkishServiceBySlug = Object.fromEntries(Object.entries(servicePages).map(([slug, page]) => [page.turkishSlug, { ...page, englishSlug: slug }]));
