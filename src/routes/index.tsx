import { createFileRoute } from '@tanstack/react-router'

import '../anchor.css'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="mx-auto max-w-xl space-y-16 p-8 text-slate-800">
      <h1 className="text-3xl font-bold">CSS Anchor Positioning</h1>

      <p className="no-support rounded-lg bg-amber-100 p-4 text-amber-900">
        Your browser doesn't support CSS Anchor Positioning yet.
      </p>

      {/* 1. position-area */}
      <section>
        <h2 className="mb-12 text-xl font-semibold">1. position-area</h2>
        <button className="tooltip-anchor rounded-lg bg-indigo-600 px-4 py-2 text-white">
          Hover me
        </button>
        <p className="tooltip rounded bg-slate-900 px-3 py-1.5 text-sm text-white">
          I'm anchored to the button
        </p>
      </section>

      {/* 2. anchor() + anchor-size() */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          2. anchor() + anchor-size()
        </h2>
        <button
          popoverTarget="menu"
          className="menu-button w-56 rounded-lg bg-indigo-600 px-4 py-2 text-left text-white"
        >
          Open menu ▾
        </button>
        <ul
          id="menu"
          popover="auto"
          className="menu rounded-lg bg-white p-1 shadow-lg ring-1 ring-slate-200"
        >
          <li className="rounded px-3 py-2 hover:bg-slate-100">Profile</li>
          <li className="rounded px-3 py-2 hover:bg-slate-100">Settings</li>
          <li className="rounded px-3 py-2 hover:bg-slate-100">Sign out</li>
        </ul>
      </section>

      {/* 3. position-try-fallbacks */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">
          3. position-try-fallbacks
        </h2>
        <p className="mb-4 text-slate-600">
          Scroll down until the anchor reaches the top edge of the box. The
          tooltip flips below it.
        </p>
        <div className="scroll-area">
          <div className="h-48 overflow-y-auto rounded-lg border border-slate-300 bg-slate-50">
            <div className="pt-32 pb-48 text-center">
              <span className="flip-anchor inline-block rounded bg-emerald-600 px-3 py-1 text-white">
                Anchor
              </span>
            </div>
          </div>
          <span className="flip-tip rounded bg-slate-900 px-3 py-1.5 text-sm whitespace-nowrap text-white">
            I flip when there's no room
          </span>
        </div>
      </section>

      {/* 4. @position-try */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">4. @position-try</h2>
        <p className="mb-4 text-slate-600">
          Drag the bottom-right corner to make the box narrower. The tooltip
          moves below the anchor.
        </p>
        <div className="w-full min-w-48 resize-x overflow-auto rounded-lg border border-slate-300 bg-slate-50 p-4">
          <div className="try-area h-24 text-center">
            <span className="try-anchor inline-block rounded bg-indigo-600 px-3 py-1 text-white">
              Anchor
            </span>
            <span className="try-tip rounded bg-slate-900 px-3 py-1.5 text-sm whitespace-nowrap text-white">
              Tooltip
            </span>
          </div>
        </div>
      </section>

      {/* 5. Practice */}
      <section className="practice-area">
        <h2 className="mb-4 text-xl font-semibold">5. Practice</h2>
        <p className="mb-4 text-slate-600">
          Add your own position properties to <code>.practice-anchor</code>{' '}
          and <code>.practice-tip</code> in <code>src/anchor.css</code>. Drag
          the bottom-right corner to resize the box.
        </p>
        <div className="h-64 min-h-32 w-full min-w-48 resize overflow-auto rounded-lg border border-slate-300 bg-slate-50 p-4">
          <div className="practice-area flex h-full items-center justify-center">
            <button className="practice-anchor rounded-lg bg-amber-500 px-4 py-2 text-white">
              Button
            </button>
            <span className="practice-tip rounded bg-slate-900 px-3 py-1.5 text-sm whitespace-nowrap text-white" 
            >
              Tooltip
            </span>
          </div>
        </div>
      </section>

      {/* 6. Popover practice */}
      <section className="relative pb-[100vh]">
        <h2 className="mb-4 text-xl font-semibold">6. Popover practice</h2>
        <p className="mb-4 text-slate-600">
          Add your own position properties to{' '}
          <code>.practice-popover-button</code> and{' '}
          <code>.practice-popover</code> in <code>src/anchor.css</code>.
        </p>
        <button
          popoverTarget="practice-popover"
          className="practice-popover-button rounded-lg bg-amber-500 px-4 py-2 text-white"
        >
          Open popover
        </button>
        <div
          id="practice-popover"
          popover="auto"
          className="practice-popover rounded-lg bg-white p-4 shadow-lg ring-1 ring-slate-200"
        >
          <p className="font-semibold">Popover</p>
          <p className="mt-1 text-sm text-slate-600">
            Click outside or press Esc to close.
          </p>
        </div>
      </section>
    </main>
  )
}
