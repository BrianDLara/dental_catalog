// src/pages/PriceCalculator.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { procedures } from "../lib/data";
import {
  Calculator,
  BadgeDollarSign,
  Info,
  Settings,
  Save,
  RotateCcw,
  Plus,
  Minus,
  PencilLine,
  Download,
  FileText,
  Receipt,
  Printer,
} from "lucide-react";

type Complexity = "simple" | "standard" | "complex";

type Extra = {
  key: string;
  label: string;
  add: number; // MXN
};

type PriceRule = {
  id: string; // matches procedure.id
  base: number; // MXN base (or per-unit if perUnit is used)
  perUnit?: number; // MXN per unit
  allowsUnits?: boolean;
  defaultUnits?: number;
  unitLabel?: string;
  complexityMultiplier: Record<Complexity, number>;
  extras: Extra[];
  notes?: string[];
};

const STORAGE_KEY = "price_calculator_rules_v1";

/** Defaults (placeholders) — editables en UI */
const DEFAULT_RULES: PriceRule[] = [
  {
    id: "resinas",
    base: 650,
    perUnit: 650,
    allowsUnits: true,
    defaultUnits: 1,
    unitLabel: "diente(s)",
    complexityMultiplier: { simple: 1, standard: 1.15, complex: 1.35 },
    extras: [
      { key: "rx", label: "Radiografía", add: 250 },
      { key: "anesthesia", label: "Anestesia (si aplica)", add: 150 },
      { key: "isolation", label: "Aislamiento con dique", add: 200 },
    ],
    notes: ["Depende del tamaño de la caries y si está cerca del nervio."],
  },
  {
    id: "coronas",
    base: 6500,
    allowsUnits: true,
    defaultUnits: 1,
    unitLabel: "corona(s)",
    complexityMultiplier: { simple: 1, standard: 1.1, complex: 1.25 },
    extras: [
      { key: "provisional", label: "Provisional", add: 800 },
      { key: "scan", label: "Escaneo/impresión", add: 600 },
      { key: "core", label: "Reconstrucción (poste/núcleo) si se requiere", add: 1200 },
    ],
    notes: ["Material (zirconia/cerámica/metal-porcelana) cambia el precio."],
  },
  {
    id: "endodoncia",
    base: 3200,
    allowsUnits: true,
    defaultUnits: 1,
    unitLabel: "diente(s)",
    complexityMultiplier: { simple: 1, standard: 1.2, complex: 1.45 },
    extras: [
      { key: "rx", label: "Radiografía", add: 250 },
      { key: "retx", label: "Retratamiento (si aplica)", add: 1800 },
      { key: "postop", label: "Medicamento/curación", add: 200 },
    ],
    notes: ["Molares suelen ser más complejos que incisivos/premolares."],
  },
  {
    id: "implantes",
    base: 18500,
    allowsUnits: true,
    defaultUnits: 1,
    unitLabel: "implante(s)",
    complexityMultiplier: { simple: 1, standard: 1.1, complex: 1.3 },
    extras: [
      { key: "ct", label: "Tomografía/CBCT", add: 1200 },
      { key: "graft", label: "Injerto óseo (si se requiere)", add: 6500 },
      { key: "sinus", label: "Elevación de seno (si aplica)", add: 9500 },
    ],
    notes: ["Implante + corona normalmente se cotiza según marca y complejidad."],
  },
  {
    id: "ortodoncia",
    base: 12000,
    allowsUnits: false,
    complexityMultiplier: { simple: 1, standard: 1.2, complex: 1.5 },
    extras: [
      { key: "records", label: "Registros (fotos + modelos + Rx)", add: 1500 },
      { key: "retainers", label: "Retenedores al finalizar", add: 2500 },
    ],
    notes: ["Puede cobrarse inicial + mensualidades; esto es referencia global."],
  },
  {
    id: "limpieza",
    base: 400,
    allowsUnits: false,
    complexityMultiplier: { simple: 1, standard: 1.15, complex: 1.35 },
    extras: [
      { key: "fluor", label: "Flúor", add: 200 },
      { key: "deep", label: "Limpieza profunda (si aplica)", add: 1200 },
    ],
    notes: ["Si hay periodontitis puede requerir tratamiento adicional."],
  },
  {
    id: "extraccion",
    base: 900,
    perUnit: 900,
    allowsUnits: true,
    defaultUnits: 1,
    unitLabel: "extracción(es)",
    complexityMultiplier: { simple: 1, standard: 1.25, complex: 1.6 },
    extras: [
      { key: "surgical", label: "Quirúrgica / muela del juicio retenida", add: 1400 },
      { key: "rx", label: "Radiografía", add: 250 },
      { key: "stitches", label: "Suturas (si aplica)", add: 300 },
    ],
    notes: ["Las muelas del juicio retenidas suelen requerir procedimiento quirúrgico."],
  },
];

function formatMXN(n: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function clampNumber(v: unknown, fallback = 0) {
  const num = Number(v);
  return Number.isFinite(num) ? num : fallback;
}

function labelComplexity(c: Complexity) {
  if (c === "simple") return "Simple";
  if (c === "complex") return "Complejo";
  return "Estándar";
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function makeQuoteId() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `Q-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(
    d.getMinutes()
  )}${pad(d.getSeconds())}`;
}

/** Less-round light-mode section */
function DropdownSection({
  title,
  defaultOpen = false,
  icon,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group rounded-lg border bg-white shadow-sm overflow-hidden">
      <summary className="list-none cursor-pointer select-none px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded" />
          <div className="flex items-center gap-2">
            <div className="text-primary">{icon}</div>
            <h3 className="text-gray-900 text-base font-bold">{title}</h3>
          </div>
        </div>
        <span className="text-gray-500 text-sm group-open:opacity-0 transition">Abrir</span>
      </summary>
      <div className="px-4 pb-4 pt-3 border-t bg-gray-50">{children}</div>
    </details>
  );
}

function Pill({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-md border px-3 py-2 text-left transition cursor-pointer",
        active ? "bg-primary text-white" : "bg-white hover:bg-gray-50",
      ].join(" ")}
    >
      <div className="text-sm font-semibold">{label}</div>
      <div className={`text-xs ${active ? "text-white/80" : "text-gray-500"}`}>{sub}</div>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-gray-600">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}

export default function PriceCalculator() {
  const [rules, setRules] = useState<PriceRule[]>(DEFAULT_RULES);
  const [procedureId, setProcedureId] = useState<string>(DEFAULT_RULES[0]?.id ?? "resinas");
  const [complexity, setComplexity] = useState<Complexity>("standard");
  const [units, setUnits] = useState<number>(1);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState(false);

  // Quote fields
  const [clinicName, setClinicName] = useState("Dentalinn JL");
  const [dentistName, setDentistName] = useState("");
  const [clinicPhone, setClinicPhone] = useState("");
  const [patientName, setPatientName] = useState("");
  const [quoteDate, setQuoteDate] = useState(todayISO());
  const [quoteId, setQuoteId] = useState(makeQuoteId());
  const [validDays, setValidDays] = useState<number>(7);
  const [quoteNotes, setQuoteNotes] = useState(
    "Esta cotización es estimada y puede variar tras valoración clínica."
  );

  const [includeIVA, setIncludeIVA] = useState(true);
  const [ivaRate, setIvaRate] = useState<number>(16);

  // Ref for printing only the preview
  const quoteRef = useRef<HTMLDivElement | null>(null);

  // Load saved rules
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as PriceRule[];
      if (Array.isArray(parsed) && parsed.length) setRules(parsed);
    } catch {
      // ignore
    }
  }, []);

  const rule = useMemo(() => rules.find((r) => r.id === procedureId), [rules, procedureId]);
  const proc = useMemo(() => procedures.find((p) => p.id === procedureId), [procedureId]);

  // Reset units/extras on service change
  useEffect(() => {
    const nextUnits = rule?.allowsUnits ? rule.defaultUnits ?? 1 : 1;
    setUnits(nextUnits);
    setSelectedExtras({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [procedureId]);

  const selectedExtrasList = useMemo(() => {
    if (!rule?.extras?.length) return [];
    return rule.extras.filter((ex) => !!selectedExtras[ex.key]);
  }, [rule, selectedExtras]);

  const extrasTotal = useMemo(() => selectedExtrasList.reduce((sum, ex) => sum + ex.add, 0), [selectedExtrasList]);

  const unitCount = useMemo(() => (rule?.allowsUnits ? Math.max(1, units) : 1), [rule, units]);
  const unitPrice = useMemo(() => (rule ? rule.perUnit ?? rule.base : 0), [rule]);
  const multiplier = useMemo(() => (rule ? rule.complexityMultiplier?.[complexity] ?? 1 : 1), [rule, complexity]);

  const basePart = useMemo(() => unitPrice * unitCount, [unitPrice, unitCount]);
  const subtotal = useMemo(() => basePart * multiplier + extrasTotal, [basePart, multiplier, extrasTotal]);

  const ivaDecimal = useMemo(() => Math.max(0, ivaRate) / 100, [ivaRate]);
  const ivaAmount = useMemo(() => (includeIVA ? subtotal * ivaDecimal : 0), [includeIVA, subtotal, ivaDecimal]);
  const total = useMemo(() => subtotal + ivaAmount, [subtotal, ivaAmount]);

  const title = proc?.title ?? "Servicio";
  const description = proc?.shortDescription ?? "";

  const saveRules = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
  const resetRules = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRules(DEFAULT_RULES);
  };

  const updateRule = (patch: Partial<PriceRule>) => {
    if (!rule) return;
    setRules((prev) => prev.map((r) => (r.id === rule.id ? { ...r, ...patch } : r)));
  };

  const updateMultiplier = (k: Complexity, value: number) => {
    if (!rule) return;
    updateRule({ complexityMultiplier: { ...rule.complexityMultiplier, [k]: value } });
  };

  const updateExtra = (key: string, patch: Partial<Extra>) => {
    if (!rule) return;
    updateRule({ extras: rule.extras.map((e) => (e.key === key ? { ...e, ...patch } : e)) });
  };

  const addExtra = () => {
    if (!rule) return;
    const key = `extra_${Math.random().toString(16).slice(2, 8)}`;
    updateRule({ extras: [...rule.extras, { key, label: "Nuevo extra", add: 0 }] });
  };

  const removeExtra = (key: string) => {
    if (!rule) return;
    setSelectedExtras((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    updateRule({ extras: rule.extras.filter((e) => e.key !== key) });
  };

  const regenQuoteId = () => setQuoteId(makeQuoteId());

  /** Print only the "Vista previa de cotización" panel */
  const printQuoteOnly = () => {
    const el = quoteRef.current;
    if (!el) return;

    const html = el.innerHTML;

    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) return;

    w.document.open();
    w.document.write(`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Cotización ${quoteId}</title>
<style>
  /* Force 1-page-friendly print */
  @page { size: letter; margin: 12mm; } /* change to A4 if you prefer */
  * { box-sizing: border-box; }
  body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; color: #111827; }
  .print-root { padding: 0; }

  /* shrink a bit to fit one page */
  .pdf { font-size: 11.5px; line-height: 1.25; }

  /* Basic utilities for the preview markup */
  .border { border: 1px solid #e5e7eb; }
  .rounded-lg { border-radius: 10px; }
  .rounded-md { border-radius: 8px; }
  .bg-white { background: #fff; }
  .bg-gray-50 { background: #f9fafb; }
  .text-gray-900 { color: #111827; }
  .text-gray-700 { color: #374151; }
  .text-gray-600 { color: #4b5563; }
  .text-gray-500 { color: #6b7280; }
  .font-bold { font-weight: 700; }
  .font-extrabold { font-weight: 800; }
  .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
  .p-4 { padding: 16px; }
  .p-5 { padding: 18px; }
  .px-5 { padding-left: 18px; padding-right: 18px; }
  .py-4 { padding-top: 14px; padding-bottom: 14px; }
  .mt-1 { margin-top: 4px; }
  .mt-2 { margin-top: 8px; }
  .mt-3 { margin-top: 10px; }
  .mt-4 { margin-top: 14px; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .flex { display: flex; }
  .items-start { align-items: flex-start; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .text-right { text-align: right; }
  .text-xs { font-size: 11px; }
  .text-sm { font-size: 12px; }
  .text-base { font-size: 13px; }
  .text-2xl { font-size: 20px; }
  .border-b { border-bottom: 1px solid #e5e7eb; }
  .border-t { border-top: 1px solid #e5e7eb; }

  /* Important: avoid page breaks inside the quote */
  .avoid-break { break-inside: avoid; page-break-inside: avoid; }

  /* Hide any interactive bits just in case */
  button, input, select, textarea { display: none !important; }

  /* Ensure no shadows/colored backgrounds cause weird printing */
  .shadow-sm { box-shadow: none !important; }

  /* Make sure it stays single-page */
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
  <div class="print-root pdf">
    ${html}
  </div>
</body>
</html>`);
    w.document.close();

    // Trigger print once loaded
    w.focus();
    w.print();
    w.close();
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full max-w-none px-4 xl:px-10 pt-8">
        {/* Header */}
        <div className="flex items-start gap-3 mb-5">
          <div className="mt-1 rounded-md border bg-white p-3 shadow-sm">
            <Calculator className="text-primary" />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">
              Calculadora + Cotización (México)
            </h1>
            <p className="text-gray-600 mt-1">
              Light mode + cotización lista para PDF.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditMode((v) => !v)}
            className="rounded-md border bg-white px-4 py-2 text-sm font-bold hover:bg-gray-50 transition cursor-pointer flex items-center gap-2"
            title="Modo edición"
          >
            <PencilLine className="h-4 w-4 text-primary" />
            {editMode ? "Editar: ON" : "Editar"}
          </button>
        </div>

        {/* Datos de cotización */}
        <div className="mb-5">
          <DropdownSection title="Datos de cotización" defaultOpen icon={<Receipt className="h-5 w-5" />}>
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Identificación
                </div>

                <label className="block text-xs font-bold text-gray-500 mb-1">Folio</label>
                <div className="flex items-center gap-2">
                  <input
                    value={quoteId}
                    onChange={(e) => setQuoteId(e.target.value)}
                    className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={regenQuoteId}
                    className="rounded-md border bg-white px-3 py-2 text-sm font-bold hover:bg-gray-50 transition cursor-pointer"
                    title="Generar nuevo folio"
                  >
                    ↻
                  </button>
                </div>

                <label className="block text-xs font-bold text-gray-500 mb-1 mt-3">Fecha</label>
                <input
                  type="date"
                  value={quoteDate}
                  onChange={(e) => setQuoteDate(e.target.value)}
                  className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                />

                <label className="block text-xs font-bold text-gray-500 mb-1 mt-3">Vigencia (días)</label>
                <input
                  type="number"
                  min={0}
                  value={validDays}
                  onChange={(e) => setValidDays(Math.max(0, clampNumber(e.target.value, 7)))}
                  className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                />
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="text-sm font-bold text-gray-900 mb-3">Clínica</div>

                <label className="block text-xs font-bold text-gray-500 mb-1">Nombre de la clínica</label>
                <input
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                  placeholder="Ej: Dentalinn JL"
                />

                <label className="block text-xs font-bold text-gray-500 mb-1 mt-3">Dentista (opcional)</label>
                <input
                  value={dentistName}
                  onChange={(e) => setDentistName(e.target.value)}
                  className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                  placeholder="Ej: Dr. Pablo Lara"
                />

                <label className="block text-xs font-bold text-gray-500 mb-1 mt-3">Teléfono (opcional)</label>
                <input
                  value={clinicPhone}
                  onChange={(e) => setClinicPhone(e.target.value)}
                  className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                  placeholder="Ej: +52 271 315 9509"
                />
              </div>

              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="text-sm font-bold text-gray-900 mb-3">Paciente + IVA</div>

                <label className="block text-xs font-bold text-gray-500 mb-1">Nombre del paciente</label>
                <input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                  placeholder="Ej: Juan Pérez"
                />

                <div className="mt-3 rounded-md border bg-gray-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-gray-900">Agregar IVA</div>
                      <div className="text-xs text-gray-500">Calcula IVA en el total</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIncludeIVA((v) => !v)}
                      className={[
                        "rounded-md border px-3 py-2 text-sm font-bold transition cursor-pointer",
                        includeIVA ? "bg-primary text-white" : "bg-white hover:bg-gray-50",
                      ].join(" ")}
                    >
                      {includeIVA ? "IVA: ON" : "IVA: OFF"}
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-[1fr_110px] gap-2 items-end">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Tasa IVA (%)</label>
                      <div className="text-xs text-gray-500">Default México: 16%</div>
                    </div>
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={ivaRate}
                      onChange={(e) => setIvaRate(Math.max(0, clampNumber(e.target.value, 16)))}
                      className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 text-right"
                      disabled={!includeIVA}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={printQuoteOnly}
                    className="rounded-md bg-primary text-white px-4 py-2 text-sm font-bold hover:opacity-90 transition cursor-pointer flex items-center gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    Imprimir (solo cotización)
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="rounded-md border bg-white px-4 py-2 text-sm font-bold hover:bg-gray-50 transition cursor-pointer"
                    title="Imprime todo (no recomendado)"
                  >
                    Imprimir todo
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-500 mb-1">Notas (opcional)</label>
              <textarea
                value={quoteNotes}
                onChange={(e) => setQuoteNotes(e.target.value)}
                className="w-full min-h-[80px] rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900"
              />
            </div>
          </DropdownSection>
        </div>

        {/* Editor */}
        {editMode && rule && (
          <div className="mb-5">
            <DropdownSection title="Editor de precios" defaultOpen icon={<Settings className="h-5 w-5" />}>
              <div className="rounded-lg border bg-gray-50 p-4 mb-4">
                <div className="text-sm font-bold text-primary mb-1">Tip</div>
                <p className="text-sm text-gray-600">
                  Cambia números y luego presiona <span className="font-semibold text-gray-900">Guardar</span>.
                  Se guarda en este navegador (localStorage).
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                  <label className="block text-sm font-bold mb-2 text-gray-900">Precio base (MXN)</label>
                  <input
                    type="number"
                    value={rule.base}
                    onChange={(e) => updateRule({ base: clampNumber(e.target.value, rule.base) })}
                    className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                  />
                </div>

                <div className="rounded-lg border bg-white p-4 shadow-sm">
                  <label className="block text-sm font-bold mb-2 text-gray-900">
                    Precio por unidad (MXN) (opcional)
                  </label>
                  <input
                    type="number"
                    value={rule.perUnit ?? 0}
                    onChange={(e) => {
                      const v = clampNumber(e.target.value, 0);
                      updateRule({ perUnit: v > 0 ? v : undefined });
                    }}
                    className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                  />
                </div>

                <div className="rounded-lg border bg-white p-4 shadow-sm">
                  <label className="block text-sm font-bold mb-2 text-gray-900">Etiqueta de unidad</label>
                  <input
                    type="text"
                    value={rule.unitLabel ?? ""}
                    onChange={(e) => updateRule({ unitLabel: e.target.value })}
                    className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                    placeholder="Ej: diente(s)"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
                <div className="text-sm font-bold text-gray-900 mb-3">Multiplicadores por complejidad</div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Simple</label>
                    <input
                      type="number"
                      step="0.05"
                      value={rule.complexityMultiplier.simple}
                      onChange={(e) => updateMultiplier("simple", clampNumber(e.target.value, 1))}
                      className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Estándar</label>
                    <input
                      type="number"
                      step="0.05"
                      value={rule.complexityMultiplier.standard}
                      onChange={(e) => updateMultiplier("standard", clampNumber(e.target.value, 1))}
                      className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Complejo</label>
                    <input
                      type="number"
                      step="0.05"
                      value={rule.complexityMultiplier.complex}
                      onChange={(e) => updateMultiplier("complex", clampNumber(e.target.value, 1))}
                      className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="text-sm font-bold text-gray-900">Extras</div>
                  <button
                    type="button"
                    onClick={addExtra}
                    className="rounded-md border bg-white px-3 py-2 text-sm font-bold hover:bg-gray-50 transition cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                    Agregar extra
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-3">
                  {rule.extras.map((ex) => (
                    <div key={ex.key} className="rounded-lg border bg-gray-50 p-3">
                      <div className="grid grid-cols-[1fr_140px_44px] gap-2 items-center">
                        <input
                          value={ex.label}
                          onChange={(e) => updateExtra(ex.key, { label: e.target.value })}
                          className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                          placeholder="Nombre del extra"
                        />
                        <input
                          type="number"
                          value={ex.add}
                          onChange={(e) => updateExtra(ex.key, { add: clampNumber(e.target.value, ex.add) })}
                          className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900"
                          placeholder="MXN"
                        />
                        <button
                          type="button"
                          onClick={() => removeExtra(ex.key)}
                          className="h-10 w-10 rounded-md border bg-white hover:bg-gray-50 transition cursor-pointer flex items-center justify-center"
                          aria-label="Eliminar extra"
                          title="Eliminar"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={saveRules}
                  className="rounded-md bg-primary text-white px-4 py-2 text-sm font-bold hover:opacity-90 transition cursor-pointer flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </button>

                <button
                  type="button"
                  onClick={resetRules}
                  className="rounded-md border bg-white px-4 py-2 text-sm font-bold hover:bg-gray-50 transition cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4 text-primary" />
                  Restaurar defaults
                </button>
              </div>
            </DropdownSection>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          {/* LEFT */}
          <div className="space-y-4">
            <DropdownSection title="Selección y opciones" defaultOpen icon={<BadgeDollarSign className="h-5 w-5" />}>
              <label className="block text-sm font-bold text-gray-900 mb-2">Servicio dental</label>

              <select
                value={procedureId}
                onChange={(e) => setProcedureId(e.target.value)}
                className="w-full rounded-md border bg-white px-3 py-2.5 text-sm text-gray-900"
              >
                {rules.map((r) => {
                  const p = procedures.find((x) => x.id === r.id);
                  return (
                    <option key={r.id} value={r.id}>
                      {p?.title ?? r.id}
                    </option>
                  );
                })}
              </select>

              <div className="mt-5">
                <label className="block text-sm font-bold text-gray-900 mb-2">Complejidad del caso</label>
                <div className="grid grid-cols-3 gap-2">
                  <Pill active={complexity === "simple"} onClick={() => setComplexity("simple")} label="Simple" sub="Rápido" />
                  <Pill
                    active={complexity === "standard"}
                    onClick={() => setComplexity("standard")}
                    label="Estándar"
                    sub="Promedio"
                  />
                  <Pill
                    active={complexity === "complex"}
                    onClick={() => setComplexity("complex")}
                    label="Complejo"
                    sub="Difícil"
                  />
                </div>
              </div>

              {rule?.allowsUnits && (
                <div className="mt-5">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Cantidad ({rule.unitLabel ?? "unidad(es)"})
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUnits((u) => Math.max(1, u - 1))}
                      className="h-10 w-10 rounded-md border bg-white hover:bg-gray-50 transition cursor-pointer flex items-center justify-center"
                      aria-label="Disminuir"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <input
                      value={units}
                      onChange={(e) => setUnits(Math.max(1, clampNumber(e.target.value, 1)))}
                      type="number"
                      min={1}
                      className="w-28 rounded-md border bg-white px-3 py-2 text-sm text-center text-gray-900"
                    />

                    <button
                      type="button"
                      onClick={() => setUnits((u) => u + 1)}
                      className="h-10 w-10 rounded-md border bg-white hover:bg-gray-50 transition cursor-pointer flex items-center justify-center"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {rule?.extras?.length ? (
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                    <Info className="h-5 w-5" />
                    Extras comunes
                  </div>

                  <div className="grid md:grid-cols-2 gap-2">
                    {rule.extras.map((ex) => (
                      <label
                        key={ex.key}
                        className="flex items-center justify-between gap-3 rounded-md border bg-white px-3 py-3 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <span className="text-sm text-gray-900">{ex.label}</span>
                        <span className="text-sm font-bold text-gray-900">+{formatMXN(ex.add)}</span>
                        <input
                          type="checkbox"
                          checked={!!selectedExtras[ex.key]}
                          onChange={(e) =>
                            setSelectedExtras((prev) => ({
                              ...prev,
                              [ex.key]: e.target.checked,
                            }))
                          }
                          className="ml-2"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}
            </DropdownSection>
          </div>

          {/* RIGHT: Preview to print */}
          <aside className="rounded-lg border bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-white border">
                  <Receipt className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-gray-900">Vista previa de cotización</h2>
                  <p className="text-sm text-gray-600 mt-1">Esta es la sección que se imprime.</p>
                </div>
              </div>
            </div>

            {/* IMPORTANT: this is the ONLY content printed */}
            <div ref={quoteRef} className="p-5">
              <div className="avoid-break rounded-lg border bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-gray-900">{clinicName || "Clínica dental"}</div>
                    {dentistName ? (
                      <div className="text-xs text-gray-600 mt-1">Atiende: {dentistName}</div>
                    ) : null}
                    {clinicPhone ? (
                      <div className="text-xs text-gray-600 mt-1">Tel: {clinicPhone}</div>
                    ) : null}

                    <div className="text-xs text-gray-600 mt-2">
                      Cotización: <span className="font-mono">{quoteId}</span> · {quoteDate}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Paciente: <span className="font-bold text-gray-900">{patientName || "—"}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Vigencia: <span className="font-bold text-gray-900">{validDays} día(s)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-600">TOTAL</div>
                    <div className="text-2xl font-extrabold text-gray-900">{formatMXN(total)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      IVA {includeIVA ? `${ivaRate}%` : "No aplica"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="avoid-break mt-4 rounded-lg border bg-white p-4">
                <div className="text-sm font-bold text-gray-900 mb-2">Conceptos</div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-gray-900">{title}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {unitCount} × {formatMXN(unitPrice)}
                        {rule?.unitLabel ? ` (${rule.unitLabel})` : ""} · {labelComplexity(complexity)} (×
                        {multiplier.toFixed(2)})
                      </div>
                      {description ? <div className="text-xs text-gray-600 mt-1">{description}</div> : null}
                    </div>
                    <div className="font-semibold text-gray-900">{formatMXN(basePart * multiplier)}</div>
                  </div>

                  {selectedExtrasList.length ? (
                    <div className="pt-2 border-t">
                      {selectedExtrasList.map((e) => (
                        <div key={e.key} className="flex items-center justify-between gap-3 mt-2">
                          <div className="text-gray-700">{e.label}</div>
                          <div className="font-semibold text-gray-900">{formatMXN(e.add)}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="pt-2 border-t space-y-2">
                    <Row label="Subtotal" value={formatMXN(subtotal)} />
                    <Row label={`IVA (${includeIVA ? `${ivaRate}%` : "No aplica"})`} value={formatMXN(ivaAmount)} />
                    <div className="flex items-center justify-between gap-3 text-base font-extrabold">
                      <div className="text-gray-900">Total</div>
                      <div className="text-gray-900">{formatMXN(total)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {quoteNotes ? (
                <div className="avoid-break mt-4 rounded-lg border bg-gray-50 p-4">
                  <div className="text-sm font-bold text-gray-900 mb-1">Notas</div>
                  <div className="text-sm text-gray-600">{quoteNotes}</div>
                </div>
              ) : null}

              <div className="mt-4 text-xs text-gray-500">
                * Estimación. La cotización final puede variar por diagnóstico, materiales y necesidades del paciente.
              </div>
            </div>

            <div className="px-5 py-4 border-t bg-gray-50 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={printQuoteOnly}
                className="rounded-md bg-primary text-white px-4 py-2 text-sm font-bold hover:opacity-90 transition cursor-pointer flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Imprimir (solo cotización)
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
