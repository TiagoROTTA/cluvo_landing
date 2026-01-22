'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import PipelineTimeline from '@/components/PipelineTimeline'

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    Object.entries(sectionRefs.current).forEach(([key, ref]) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(key))
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '-50px',
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAuthClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = 'https://app.cluvoai.com'
  }

  // Calculate yearly price
  const monthlyPrice = 29.99
  const yearlyMonthlyPrice = 24.99
  const yearlyPrice = yearlyMonthlyPrice * 12 // $299.88/year

  return (
    <>
      {/* Navigation */}
      <nav className="w-full py-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-center md:justify-between animate-fade-in">
        <div className="flex items-center justify-center md:justify-start">
          <Image 
            src="/logo.png" 
            alt="CLUVO Logo" 
            width={170} 
            height={42}
            className="h-16 w-auto transition-transform hover:scale-105 duration-300"
          />
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600 dark:text-gray-300">
          <a className="hover:text-primary transition-all duration-300 hover:scale-105" href="#methodology" onClick={(e) => handleScrollToSection(e, 'methodology')}>Methodology</a>
          <a className="hover:text-primary transition-all duration-300 hover:scale-105" href="#features" onClick={(e) => handleScrollToSection(e, 'features')}>Features</a>
          <a className="hover:text-primary transition-all duration-300 hover:scale-105" href="#pricing" onClick={(e) => handleScrollToSection(e, 'pricing')}>Pricing</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a 
            className="border border-gray-300 dark:border-gray-600 hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary font-mono font-bold text-sm px-6 py-3 rounded transition-all duration-300 hover:scale-105 hover:shadow-md" 
            href="#" 
            onClick={handleAuthClick}
          >
            Login
          </a>
          <a 
            className="bg-primary hover:bg-primary-dark text-white dark:text-deep-jungle font-mono font-bold text-sm px-6 py-3 rounded shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105" 
            href="#" 
            onClick={handleAuthClick}
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* Header Section */}
      <header className="relative pt-12 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark text-[10px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Now Available
            </div>
            <h1 className="font-mono font-bold text-5xl sm:text-6xl leading-[1.1] text-deep-jungle dark:text-white mb-6 animate-slide-up">
              Don&apos;t Pitch a <span className="relative inline-block">Hallucination
                <svg className="absolute w-full h-[15px] -bottom-2 left-0 text-soft-coral z-10" preserveAspectRatio="none" viewBox="0 0 200 12">
                  <path d="M0 6c2.65 0 3.853 2.706 4.914 5.094C5.962 9.453 6.744 11 8 11c1.412 0 2.537-2.026 3.626-3.986C12.996 4.549 14.412 2 17 2c2.589 0 4.005 2.549 5.374 5.014C23.463 8.974 24.589 11 26 11c1.256 0 2.037-1.547 3.086-3.906C30.147 4.706 31.351 2 34 2c2.65 0 3.853 2.706 4.914 5.094C39.962 9.453 40.744 11 42 11c1.412 0 2.537-2.026 3.626-3.986C46.996 4.549 48.412 2 51 2c2.589 0 4.005 2.549 5.374 5.014C57.463 8.974 58.589 11 60 11c1.256 0 2.037-1.547 3.086-3.906C64.147 4.706 65.351 2 68 2c2.65 0 3.853 2.706 4.914 5.094C73.962 9.453 74.744 11 76 11c1.412 0 2.537-2.026 3.626-3.986C80.996 4.549 82.412 2 85 2c2.589 0 4.005 2.549 5.374 5.014C91.463 8.974 92.589 11 94 11c1.256 0 2.037-1.547 3.086-3.906C98.147 4.706 99.351 2 102 2c2.65 0 3.853 2.706 4.914 5.094C107.962 9.453 108.744 11 110 11c1.412 0 2.537-2.026 3.626-3.986C114.996 4.549 116.412 2 119 2c2.589 0 4.005 2.549 5.374 5.014C125.463 8.974 126.589 11 128 11c1.256 0 2.037-1.547 3.086-3.906C132.147 4.706 133.351 2 136 2c2.65 0 3.853 2.706 4.914 5.094C141.962 9.453 142.744 11 144 11c1.412 0 2.537-2.026 3.626-3.986C148.996 4.549 150.412 2 153 2c2.589 0 4.005 2.549 5.374 5.014C159.463 8.974 160.589 11 162 11c1.256 0 2.037-1.547 3.086-3.906C166.147 4.706 167.351 2 170 2c2.65 0 3.853 2.706 4.914 5.094C175.962 9.453 176.744 11 178 11c1.412 0 2.537-2.026 3.626-3.986C182.996 4.549 184.412 2 187 2c2.589 0 4.005 2.549 5.374 5.014C193.463 8.974 194.589 11 196 11c1.256 0 2.037-1.547 3.086-3.906C200.147 4.706 200 6 200 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span> <br/>
               <span className="text-primary">Prove Demand.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-lg animate-fade-in-delay">
              Turn customer conversations into <span className="font-bold italic">investor-grade evidence</span>
            </p>
            <div className="mb-10 max-w-md animate-slide-up-delay">
              <a 
                href="#"
                onClick={handleAuthClick}
                className="inline-flex bg-primary hover:bg-primary-dark text-white dark:text-deep-jungle font-mono font-bold text-sm px-8 py-4 rounded shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 items-center justify-center gap-2 whitespace-nowrap group"
              >
                Get Started <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
              </a>
            </div>
            <div className="mt-8 animate-fade-in-delay-2">
              <p className="text-xs font-mono uppercase text-gray-400 mb-4 tracking-widest">Early traction from founders at</p>
              <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="font-bold text-xl font-serif hover:scale-110 transition-transform duration-300">Y Combinator</span>
                <span className="font-bold text-xl italic font-serif hover:scale-110 transition-transform duration-300">Techstars</span>
                <span className="font-bold text-xl font-mono hover:scale-110 transition-transform duration-300">500</span>
              </div>
            </div>
          </div>
          <div className="relative animate-slide-in-right">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-soft-coral/10 rounded-full blur-3xl"></div>
            <div className="relative bg-white dark:bg-card-dark rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gray-50 dark:bg-black/20 px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-soft-coral animate-pulse"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-gray-400 mb-1">Project</div>
                    <h3 className="font-semibold text-xl text-deep-jungle dark:text-white">SaaS Analytics Platform</h3>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded text-[10px] font-mono text-green-700 dark:text-green-400">
                    <span className="material-symbols-outlined text-sm">check_circle</span> HYPOTHESIS VALIDATED
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 dark:bg-black/20 p-4 rounded border border-gray-100 dark:border-gray-700">
                    <div className="text-[10px] font-mono uppercase text-gray-400 mb-2">Confidence Score</div>
                    <div className="text-3xl font-mono font-bold text-deep-jungle dark:text-white">94<span className="text-sm text-gray-400 font-normal">/100</span></div>
                  </div>
                  <div className="bg-gray-50 dark:bg-black/20 p-4 rounded border border-gray-100 dark:border-gray-700">
                    <div className="text-[10px] font-mono uppercase text-gray-400 mb-2">Pain Point Intensity</div>
                    <div className="text-3xl font-mono font-bold text-deep-jungle dark:text-white">High</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase text-gray-400 mb-2">
                    <span>Customer Interviews</span>
                    <span>12/15 Completed</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-4/5 rounded-full"></div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 font-mono text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span className="text-primary">&gt;_</span> Generating Beta Report...
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Methodology Banner */}
      <div 
        ref={(el) => { sectionRefs.current['methodology'] = el as HTMLElement | null }}
        className={`border-y border-gray-100 dark:border-gray-800 bg-emerald-50/30 dark:bg-emerald-900/10 py-4 transition-all duration-700 ${
          visibleSections.has('methodology') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        id="methodology"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap justify-center items-center gap-8 text-xs font-mono text-gray-500 uppercase tracking-wide">
          <span className="text-gray-400">Scientific Methodology:</span>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-sm">menu_book</span> The Mom Test
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-sm">rocket_launch</span> Lean Startup
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-sm">science</span> Bias Filtering
          </div>
        </div>
      </div>

      {/* Old Way vs CLUVO Way Section */}
      <section 
        ref={(el) => { sectionRefs.current['old-vs-new'] = el as HTMLElement | null }}
        className={`py-20 px-4 sm:px-8 max-w-7xl mx-auto transition-all duration-700 ${
          visibleSections.has('old-vs-new') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-deep-jungle dark:text-white mb-4">
            The Old Way vs. The CLUVO Way
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Stop relying on false positives. <br></br>CLUVO uses behavioral markers to identify true intent before you write a single line of code.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50/30 dark:bg-red-900/10 rounded-xl p-8 border border-red-100 dark:border-red-900/30 relative">
            <div className="absolute top-4 right-4 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-[10px] font-mono font-bold px-2 py-1 rounded">
              FALSE POSITIVE
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-500 mb-6">
              <span className="material-symbols-outlined">close</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-deep-jungle dark:text-white">The Old Way</h3>
            <p className="font-mono text-sm text-gray-500 mb-6">&quot;Would you buy this if we built it?&quot;</p>
            <div className="bg-white dark:bg-black/20 p-4 rounded border border-red-100 dark:border-red-900/20 italic text-gray-600 dark:text-gray-300 mb-4 font-serif">
              &quot;Yeah, totally! I&apos;d love that. Ping me when you launch.&quot;
            </div>
            <p className="text-xs text-red-500 font-mono">RESULT: Compliments aren&apos;t cash. They won&apos;t actually pay.</p>
          </div>
          <div className="bg-emerald-50/30 dark:bg-emerald-900/10 rounded-xl p-8 border border-primary/30 relative shadow-sm">
            <div className="absolute top-4 right-4 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold px-2 py-1 rounded">
              EVIDENCE-BASED
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 mb-6">
              <span className="material-symbols-outlined">check</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-deep-jungle dark:text-white">The CLUVO Way</h3>
            <p className="font-mono text-sm text-gray-500 mb-6">Analyze friction points, not opinions.</p>
            <div className="bg-white dark:bg-black/20 p-4 rounded border border-primary/20 font-mono text-xs text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <div className="flex gap-2">
                <span className="text-primary">&gt;</span>
                <span>Evidence: User current workflow is 4 hours/day manual.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">&gt;</span>
                <span>Action: User requested to connect for a 2nd deep dive.</span>
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-mono">RESULT: High Intent. Validated pain point intensity is High.</p>
          </div>
        </div>
      </section>

      {/* Pipeline Timeline Section */}
      <section 
        ref={(el) => { sectionRefs.current['features'] = el as HTMLElement | null }}
        className={`bg-emerald-50/30 dark:bg-emerald-900/10 py-20 px-4 sm:px-8 max-w-7xl mx-auto transition-all duration-700 ${
          visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        id="features"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-deep-jungle dark:text-white mb-4">
            From Chaos to Clarity
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            See how Cluvo turns messy customer feedback into binary validation data in three simple steps.
          </p>
        </div>
        <PipelineTimeline />
      </section>

      {/* Pricing Section */}
      <section 
        ref={(el) => { sectionRefs.current['pricing'] = el as HTMLElement | null }}
        className={`py-24 px-4 sm:px-8 max-w-7xl mx-auto transition-all duration-700 ${
          visibleSections.has('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        id="pricing"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-mono font-bold text-3xl sm:text-4xl text-deep-jungle dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            Choose the plan that fits your needs
          </p>
          
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-mono font-medium transition-all duration-300 ${billingCycle === 'monthly' ? 'text-deep-jungle dark:text-white scale-110' : 'text-gray-400 dark:text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle billing cycle"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition-all duration-300 ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-mono font-medium transition-all duration-300 ${billingCycle === 'yearly' ? 'text-deep-jungle dark:text-white scale-110' : 'text-gray-400 dark:text-gray-500'}`}>
              Yearly
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8 relative flex flex-col hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="font-mono font-bold text-2xl text-deep-jungle dark:text-white mb-2">Free Plan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Perfect for getting started with customer discovery</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-bold text-deep-jungle dark:text-white">$0</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">3 interviews per month</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Transcript analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">AI-powered insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Customer discovery tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Hypothesis tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Community support</span>
              </li>
            </ul>
            <a
              href="#"
              onClick={handleAuthClick}
              className="w-full block text-center border border-gray-300 dark:border-gray-600 hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary font-mono font-bold py-3 rounded transition-all duration-300 hover:scale-105 mt-auto"
            >
              Free Plan
            </a>
          </div>

          {/* Pro Plan - Recommended */}
          <div className="bg-white dark:bg-card-dark rounded-xl border-2 border-primary shadow-glow p-8 relative flex flex-col hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-deep-jungle text-[10px] font-mono font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
            </div>
            <div className="mb-6">
              <h3 className="font-mono font-bold text-2xl text-deep-jungle dark:text-white mb-2">Pro Plan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Everything you need to validate product-market fit with real evidence</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-bold text-deep-jungle dark:text-white">
                  ${billingCycle === 'monthly' ? monthlyPrice.toFixed(2) : yearlyMonthlyPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  /{billingCycle === 'monthly' ? 'month' : 'month'}
                </span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ${yearlyPrice.toFixed(2)} billed annually (save ${(monthlyPrice * 12 - yearlyPrice).toFixed(2)})
                </p>
              )}
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Unlimited interviews per month</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Unlimited transcript analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Advanced AI-powered insights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Customer discovery tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Investor memo generation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Hypothesis tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Priority support</span>
              </li>
            </ul>
            <a
              href="#"
              onClick={handleAuthClick}
              className="w-full block text-center bg-primary hover:bg-primary-dark text-white dark:text-deep-jungle font-mono font-bold py-3 rounded shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 mt-auto"
            >
              Start Pro Plan
            </a>
          </div>

          {/* Future Unicorn Plan */}
          <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-gray-700 p-8 relative flex flex-col hover:scale-105 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="font-mono font-bold text-2xl text-deep-jungle dark:text-white mb-2">Future Unicorn</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Enterprise solutions for teams building the next unicorn</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-bold text-deep-jungle dark:text-white">Custom</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Everything in Pro</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Team collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Custom integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Custom training & onboarding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">SLA guarantees</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Volume discounts</span>
              </li>
            </ul>
            <a
              href="mailto:contact@cluvoai.com?subject=Future Unicorn Plan Inquiry"
              className="w-full block text-center border border-gray-300 dark:border-gray-600 hover:border-primary text-gray-700 dark:text-gray-300 hover:text-primary font-mono font-bold py-3 rounded transition-all duration-300 hover:scale-105 mt-auto"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        ref={(el) => { sectionRefs.current['footer'] = el as HTMLElement | null }}
        className={`bg-white dark:bg-background-dark py-12 px-4 sm:px-8 border-t border-gray-100 dark:border-gray-800 transition-all duration-700 ${
          visibleSections.has('footer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="CLUVO Logo" 
              width={150} 
              height={40}
              className="h-16 w-auto transition-transform hover:scale-110 duration-300"
            />
          </div>
          <div className="font-mono text-[10px] text-gray-400">
            © 2026 CLUVO Inc.
          </div>
        </div>
      </footer>
    </>
  )
}

