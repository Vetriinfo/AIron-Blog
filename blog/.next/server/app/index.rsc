2:I[4676,["972","static/chunks/972-8c0ee6fabcd1342f.js","699","static/chunks/699-7fdc3fb172316aa4.js","559","static/chunks/559-4a940e010e14d25b.js","931","static/chunks/app/page-b5d7fd4a2f40c76a.js"],"HomePageClient"]
6:I[5495,["972","static/chunks/972-8c0ee6fabcd1342f.js","699","static/chunks/699-7fdc3fb172316aa4.js","185","static/chunks/app/layout-22728c2dc81b14ec.js"],"ThemeProvider"]
7:I[915,["972","static/chunks/972-8c0ee6fabcd1342f.js","699","static/chunks/699-7fdc3fb172316aa4.js","185","static/chunks/app/layout-22728c2dc81b14ec.js"],"Navbar"]
8:I[4707,[],""]
9:I[6423,[],""]
a:I[2972,["972","static/chunks/972-8c0ee6fabcd1342f.js","699","static/chunks/699-7fdc3fb172316aa4.js","185","static/chunks/app/layout-22728c2dc81b14ec.js"],""]
3:T5c1,
Structural engineering sits at the intersection of applied physics, material science, and building codes. If you're coming from software and automation, here's a concise map of the territory.

## Why It Matters for Automation

Automation in structural design isn't just "scripting CAD." It's about encoding **rules** (codes), **constraints** (loads, capacities), and **workflows** (from model to drawing to calc). Understanding the domain makes your tools safer and more useful.

## Key Concepts

### Loads and Load Paths

Buildings resist gravity, wind, and seismic loads. Loads flow from slabs to beams to columns to foundations. Your automation often needs to:

- Read or assign load data from 3D models
- Combine load cases (e.g., dead + live, or load combinations per code)
- Export loads for handoffs to other disciplines

Getting the load path right is the first step to correct design.

### Codes and Standards

Design is code-driven. In the US, common references include AISC (steel), ACI (concrete), and ASCE 7 (loads). Automation that references code sections (e.g., "AISC 360-16 Chapter D") helps with traceability and audits.

## Next Steps

- Dive into **steel connection design** if you're in Tekla or similar.
- Use **Python or C#** to script checks and reports.
- Consider **RAG over code PDFs** for quick lookups.

This post is a starting point; later posts will go deeper into steel design, Tekla, and automation patterns.
4:T6a5,
Tekla Structures exposes a .NET API that you can drive from C# or, with a little setup, from **Python** via pythonnet. Here's a practical overview.

## Why Python?

Many engineers already use Python for data, calcs, and scripts. Using it with Tekla lets you:

- Reuse pandas, numpy, and your existing tooling
- Run checks and exports in CI or on a server
- Build one-off scripts without spinning up Visual Studio

The tradeoff is a bit of setup (pythonnet, Tekla's .NET runtime) and sometimes slower iteration than C# in Visual Studio.

## Getting Started

1. **Install Tekla** and ensure the Tekla Open API assemblies are available.
2. **Install pythonnet** (`pip install pythonnet`).
3. **Reference the Tekla assemblies** and connect to the running Tekla process or open a model.

A minimal "hello world" might look like:

```python
import clr
clr.AddReference("Tekla.Structures.Model")
from Tekla.Structures.Model import Model

model = Model()
if model.GetConnectionStatus():
    print("Connected to Tekla.")
else:
    print("Open a model in Tekla first.")
```

From here you can enumerate model objects, read properties, and create or modify elements.

## Typical Use Cases

- **Model enumeration**: Loop over beams, columns, or connections and extract IDs, profiles, and positions.
- **Batch property updates**: Change phase, name, or user-defined attributes in bulk.
- **Export to CSV/JSON**: Push model data into pandas for analysis or reporting.
- **Drawing lists**: Query drawing objects and export titles and status.

## Next

We'll look at **C# vs Python** for Tekla in a follow-up, and then **connection design checks** driven from the model.
5:T715,
Design codes (AISC, ACI, ASCE, Eurocodes) are long, dense, and full of cross-references. **RAG** (retrieval-augmented generation) can turn them into queryable knowledge bases for lookups and summaries—without replacing the need to read the actual document.

## What RAG Does Here

1. **Ingest**: Chunk the code PDF or text (by section, clause, or fixed size).
2. **Embed**: Store chunks in a vector store with embeddings.
3. **Retrieve**: For a user question, find the most relevant chunks.
4. **Generate**: Send those chunks plus the question to an LLM to produce an answer grounded in the text.

The result: "What does AISC 360 say about block shear?" returns a short answer with the right section and key wording, instead of you scrolling the PDF.

## Chunking Strategy

Codes have hierarchy (chapter → section → clause). Prefer **semantic chunking** that respects that structure so retrieval returns whole clauses or sub-clauses. Avoid splitting mid-sentence or mid-table.

## Safety and Liability

- **Never** present RAG output as a substitute for reading the code. Always cite section numbers and encourage the user to verify.
- Use **guardrails**: e.g., "This is for reference only; confirm with the current printed code."
- Prefer **conservative** model behavior (stick to the retrieved text, avoid extrapolation).

## Stack Sketch

- **Documents**: PDFs of the code (with permission / licensing in mind).
- **Embeddings**: OpenAI, Cohere, or open-source (e.g., sentence-transformers).
- **Vector store**: Pinecone, Weaviate, or local (Chroma, LanceDB).
- **Orchestration**: LangChain, LlamaIndex, or custom pipelines.

A later post will walk through a minimal **RAG pipeline** for one code (e.g., AISC 360 Chapter D) and how to expose it as a simple API or chat UI.
0:["y6CEFFdociYUsb3nQD75J",[[["",{"children":["__PAGE__",{}]},"$undefined","$undefined",true],["",{"children":["__PAGE__",{},[["$L1",["$","$L2",null,{"featured":[{"slug":"structural-engineering-basics","frontmatter":{"title":"Structural Engineering Basics for Software Engineers","description":"A bridge between structural engineering concepts and automation—loads, codes, and why they matter for tooling.","date":"2025-02-15","category":"Structural Engineering","tags":["structural","basics","codes"],"published":true},"content":"$3","readingTime":"2 min read","readingTimeMinutes":2},{"slug":"python-tekla-automation","frontmatter":{"title":"Python and Tekla Structures—Where They Meet","description":"Using Python to drive Tekla via the Open API: model queries, batch updates, and export pipelines.","date":"2025-02-10","category":"Steel Design & Tekla","tags":["python","tekla","automation"],"published":true},"content":"$4","readingTime":"2 min read","readingTimeMinutes":2}],"latest":[{"slug":"rag-for-design-codes","frontmatter":{"title":"RAG for Design Codes and Standards","description":"Using retrieval-augmented generation to query building codes and standards—setup, chunking, and safety.","date":"2025-02-01","category":"AI Agents & RAG","tags":["rag","ai","codes","agents"],"published":true},"content":"$5","readingTime":"2 min read","readingTimeMinutes":2}]}],null],null],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/054ff76023ea6eff.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen font-sans __variable_f367f3 __variable_3c557b","children":["$","$L6",null,{"children":["$","div",null,{"className":"flex min-h-screen flex-col","children":[["$","$L7",null,{}],["$","main",null,{"className":"flex-1","children":["$","$L8",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L9",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":["$","div",null,{"className":"mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-24 text-center","children":[["$","h1",null,{"className":"font-display text-4xl font-bold text-ink","children":"404"}],["$","p",null,{"className":"mt-2 text-ink-muted","children":"This page could not be found."}],["$","$La",null,{"href":"/","className":"mt-6 inline-block rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-ink-inverse hover:opacity-90","children":"Back to home"}]]}],"notFoundStyles":[]}]}],["$","footer",null,{"className":"border-t border-border bg-surface-muted/50","children":["$","div",null,{"className":"mx-auto max-w-5xl px-4 py-12 sm:px-6","children":[["$","div",null,{"className":"grid gap-8 sm:grid-cols-2 lg:grid-cols-4","children":[["$","div",null,{"children":[["$","$La",null,{"href":"/","className":"font-display text-lg font-semibold text-ink","children":"Technical Creator Blog"}],["$","p",null,{"className":"mt-2 text-sm text-ink-muted","children":"Structural Engineering · Steel Design · Python & AI · Investing"}]]}],["$","div",null,{"children":[["$","h3",null,{"className":"text-sm font-semibold uppercase tracking-wider text-ink-muted","children":"Navigation"}],["$","ul",null,{"className":"mt-3 space-y-2","children":[["$","li","/",{"children":["$","$La",null,{"href":"/","className":"text-sm text-ink-muted hover:text-ink","children":"Home"}]}],["$","li","/blog",{"children":["$","$La",null,{"href":"/blog","className":"text-sm text-ink-muted hover:text-ink","children":"Blog"}]}],["$","li","/about",{"children":["$","$La",null,{"href":"/about","className":"text-sm text-ink-muted hover:text-ink","children":"About"}]}],["$","li","/projects",{"children":["$","$La",null,{"href":"/projects","className":"text-sm text-ink-muted hover:text-ink","children":"Projects"}]}],["$","li","/contact",{"children":["$","$La",null,{"href":"/contact","className":"text-sm text-ink-muted hover:text-ink","children":"Contact"}]}],["$","li","/contact#newsletter",{"children":["$","$La",null,{"href":"/contact#newsletter","className":"text-sm text-ink-muted hover:text-ink","children":"Newsletter"}]}]]}]]}],["$","div",null,{"children":[["$","h3",null,{"className":"text-sm font-semibold uppercase tracking-wider text-ink-muted","children":"Connect"}],["$","ul",null,{"className":"mt-3 flex gap-4","children":[["$","li",null,{"children":["$","a",null,{"href":"https://twitter.com/yourhandle","target":"_blank","rel":"noopener noreferrer","className":"text-ink-muted hover:text-ink","aria-label":"Twitter","children":["$","svg",null,{"width":"20","height":"20","viewBox":"0 0 24 24","fill":"currentColor","aria-hidden":true,"children":["$","path",null,{"d":"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"}]}]}]}],["$","li",null,{"children":["$","a",null,{"href":"https://github.com/yourhandle","target":"_blank","rel":"noopener noreferrer","className":"text-ink-muted hover:text-ink","aria-label":"GitHub","children":["$","svg",null,{"width":"20","height":"20","viewBox":"0 0 24 24","fill":"currentColor","aria-hidden":true,"children":["$","path",null,{"fillRule":"evenodd","d":"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z","clipRule":"evenodd"}]}]}]}],["$","li",null,{"children":["$","a",null,{"href":"https://linkedin.com/in/yourhandle","target":"_blank","rel":"noopener noreferrer","className":"text-ink-muted hover:text-ink","aria-label":"LinkedIn","children":["$","svg",null,{"width":"20","height":"20","viewBox":"0 0 24 24","fill":"currentColor","aria-hidden":true,"children":["$","path",null,{"d":"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"}]}]}]}]]}]]}],["$","div",null,{"children":[["$","h3",null,{"className":"text-sm font-semibold uppercase tracking-wider text-ink-muted","children":"Newsletter"}],["$","p",null,{"className":"mt-3 text-sm text-ink-muted","children":"Get updates on new posts and projects. No spam."}],["$","$La",null,{"href":"/contact#newsletter","className":"mt-2 inline-block text-sm font-medium text-brand-600 hover:underline dark:text-brand-400","children":"Subscribe →"}]]}]]}],["$","div",null,{"className":"mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row","children":[["$","p",null,{"className":"text-sm text-ink-muted","children":["© ",2026," ","Your Name",". All rights reserved."]}],["$","div",null,{"className":"flex gap-6 text-sm text-ink-muted","children":[["$","$La",null,{"href":"/sitemap.xml","className":"hover:text-ink","children":"Sitemap"}],["$","$La",null,{"href":"/feed.xml","className":"hover:text-ink","children":"RSS"}]]}]]}]]}]}]]}]}]}]}]],null],null],["$Lb",null]]]]
b:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"Technical Creator Blog · Structural Engineering · Steel Design · Python & AI · Investing"}],["$","meta","3",{"name":"description","content":"Technical blog on structural engineering, steel design & Tekla, Python & C# automation, AI agents & RAG, stock market compounding, and quantum tech."}],["$","link","4",{"rel":"author","href":"https://yourdomain.com"}],["$","meta","5",{"name":"author","content":"Your Name"}],["$","meta","6",{"name":"robots","content":"index, follow"}],["$","meta","7",{"property":"og:title","content":"Technical Creator Blog"}],["$","meta","8",{"property":"og:description","content":"Technical blog on structural engineering, steel design & Tekla, Python & C# automation, AI agents & RAG, stock market compounding, and quantum tech."}],["$","meta","9",{"property":"og:url","content":"https://yourdomain.com"}],["$","meta","10",{"property":"og:site_name","content":"Technical Creator Blog"}],["$","meta","11",{"property":"og:locale","content":"en_US"}],["$","meta","12",{"property":"og:type","content":"website"}],["$","meta","13",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","14",{"name":"twitter:creator","content":"@yourhandle"}],["$","meta","15",{"name":"twitter:title","content":"Technical Creator Blog"}],["$","meta","16",{"name":"twitter:description","content":"Technical blog on structural engineering, steel design & Tekla, Python & C# automation, AI agents & RAG, stock market compounding, and quantum tech."}]]
1:null
