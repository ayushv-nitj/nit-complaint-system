import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  GraduationCap,
  Shield,
  ShieldCheck,
  ArrowRight,
  Bell,
  Clock,
  Eye,
  Users,
  Mail,
  Github,
  Linkedin,
  Heart,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── HERO ─── */}
      <div className="relative overflow-hidden">
        {/* Soft gradient wash behind the hero text */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-indigo-100/60 via-violet-50/30 to-transparent blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-16">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Live &amp; Real-Time
            </span>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              NIT Jamshedpur
            </h1>
            <h2 className="text-3xl font-semibold text-gray-600">
              Complaint Management System
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              A real-time platform for managing and resolving campus issues
              with transparency and accountability.
            </p>
          </div>
        </div>
      </div>

      {/* ─── ROLE SELECTION CARDS ─── */}
      <section className="container mx-auto px-4 pb-20">
        <h3 className="text-2xl font-semibold text-center mb-10 text-gray-800">
          Select Your Role
        </h3>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Student */}
          <Card className="group relative overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-transparent to-indigo-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative">
              <CardHeader className="text-center pt-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <GraduationCap className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Student</CardTitle>
                <CardDescription className="text-gray-500">Submit and track your complaints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-400" /> Submit new complaints</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-400" /> Track complaint status</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-400" /> Receive real-time updates</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-indigo-400" /> View complaint history</li>
                </ul>
                <div className="space-y-2 pt-2">
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-sm" size="lg">
                    <Link href="/login?role=student">Student Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                    <Link href="/register">New Student? Register</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Admin */}
          <Card className="group relative overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-emerald-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative">
              <CardHeader className="text-center pt-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Admin</CardTitle>
                <CardDescription className="text-gray-500">Manage and resolve complaints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> Claim complaints</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> Update complaint status</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> Add remarks</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> Track your assignments</li>
                </ul>
                <div className="space-y-2 pt-2">
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-sm" size="lg">
                    <Link href="/login?role=admin">Admin Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                    <Link href="/register/admin">New Admin? Register</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Super Admin */}
          <Card className="group relative overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-transparent to-violet-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative">
              <CardHeader className="text-center pt-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-violet-600" />
                </div>
                <CardTitle className="text-xl text-gray-800">Super Admin</CardTitle>
                <CardDescription className="text-gray-500">Monitor system-wide performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-violet-400" /> View all complaints</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-violet-400" /> Access analytics</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-violet-400" /> Monitor escalations</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-violet-400" /> Generate reports</li>
                </ul>
                <div className="space-y-2 pt-2">
                  <Button asChild className="w-full bg-violet-600 hover:bg-violet-700 shadow-sm" size="lg">
                    <Link href="/login?role=superadmin">Super Admin Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-violet-200 text-violet-600 hover:bg-violet-50">
                    <Link href="/register/superadmin">New Super Admin? Register</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>


       {/* ─── DEMO CREDENTIALS ─── */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border border-indigo-100 bg-gradient-to-r from-indigo-50/60 via-white to-violet-50/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-center text-lg text-gray-800">Demo Credentials</CardTitle>
                <CardDescription className="text-center text-gray-500">Use these to explore every role instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center bg-white/70 rounded-xl p-4 border border-indigo-100">
                    <p className="font-semibold text-indigo-600 mb-2 flex items-center justify-center gap-1.5">
                      <GraduationCap className="w-4 h-4" /> Student
                    </p>
                    <p className="text-gray-500">student1@nitjsr.ac.in</p>
                    <p className="text-gray-400 font-mono text-xs mt-0.5">Password123!</p>
                  </div>
                  <div className="text-center bg-white/70 rounded-xl p-4 border border-emerald-100">
                    <p className="font-semibold text-emerald-600 mb-2 flex items-center justify-center gap-1.5">
                      <Shield className="w-4 h-4" /> Admin
                    </p>
                    <p className="text-gray-500">admin@nitjsr.ac.in</p>
                    <p className="text-gray-400 font-mono text-xs mt-0.5">Password123!</p>
                  </div>
                  <div className="text-center bg-white/70 rounded-xl p-4 border border-violet-100">
                    <p className="font-semibold text-violet-600 mb-2 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Super Admin
                    </p>
                    <p className="text-gray-500">superadmin@nitjsr.ac.in</p>
                    <p className="text-gray-400 font-mono text-xs mt-0.5">Password123!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── HOW TO USE ─── */}
      <section className="bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3 block">Guide</span>
            <h3 className="text-3xl font-bold text-gray-800">How to Use This Portal</h3>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">Four simple steps to get your campus issues resolved fast.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 01 */}
            <div className="group flex gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-indigo-600">01</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-semibold text-gray-800">Register or Log In</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">Create your account using your NIT Jamshedpur email or log in with existing credentials. Each role has a dedicated entry point.</p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="group flex gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-violet-600">02</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-5 h-5 text-violet-600" />
                  <h4 className="font-semibold text-gray-800">Submit a Complaint</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">Fill in the details of your issue — select a category, describe the problem, and submit. The system assigns it a priority automatically.</p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="group flex gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-600">03</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-semibold text-gray-800">Admin Claims &amp; Acts</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">A relevant admin claims your complaint and begins working on it. You can watch the status update in real time on your dashboard.</p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="group flex gap-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-600">04</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold text-gray-800">Get Notified &amp; Resolved</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">Receive instant notifications at every stage. If unresolved in 24 hours it auto-escalates to Super Admin for priority handling.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY FEATURES ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3 block">Why Us</span>
            <h3 className="text-3xl font-bold text-gray-800">Key Features</h3>
            <p className="text-gray-500 mt-2">Built to be fast, transparent, and accountable.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Bell className="w-5 h-5 text-indigo-600" />,
                title: "Real-Time Updates",
                desc: "Get instant notifications when your complaint status changes. No manual refresh needed.",
                bg: "from-indigo-50 to-indigo-100/50",
              },
              {
                icon: <Clock className="w-5 h-5 text-violet-600" />,
                title: "Time-Based Intelligence",
                desc: "Automatic priority escalation after 30 minutes and super admin escalation after 24 hours.",
                bg: "from-violet-50 to-violet-100/50",
              },
              {
                icon: <Eye className="w-5 h-5 text-emerald-600" />,
                title: "Complete Transparency",
                desc: "Full activity history and audit trail for every complaint from submission to resolution.",
                bg: "from-emerald-50 to-emerald-100/50",
              },
              {
                icon: <Users className="w-5 h-5 text-amber-600" />,
                title: "Accountability",
                desc: "Clear ownership with exclusive claim system. One admin per complaint ensures responsibility.",
                bg: "from-amber-50 to-amber-100/50",
              },
            ].map((feat) => (
              <Card key={feat.title} className={`border border-gray-100 shadow-sm bg-gradient-to-br ${feat.bg}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                      {feat.icon}
                    </div>
                    <CardTitle className="text-lg text-gray-800">{feat.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     

      {/* ─── MEET THE AUTHOR ─── */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3 block">The Team</span>
            <h3 className="text-3xl font-bold text-gray-800">Meet the Creator</h3>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border border-gray-100 shadow-sm bg-white">
              <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-5">
                {/* Avatar circle with gradient ring */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-indigo-600 p-[3px]" />
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center border-[3px] border-white shadow-md">
                    <span className="text-5xl select-none">👨‍💻</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800">Ayush Verma</h4>
                  <p className="text-sm font-medium text-indigo-500 mt-0.5">Full Stack Developer &amp; Project Lead</p>
                </div>

                <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
                  Passionate about building scalable, user-centric systems. Designed and developed the NIT Jamshedpur
                  Complaint Management System to bring transparency and accountability to campus issue resolution.
                </p>

                {/* Social buttons */}
                <div className="flex gap-3 pt-2">
                  <button className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200">
                    <Linkedin className="w-4 h-4" /> 
                     <Link href="https://www.linkedin.com/in/ayush-verma-jsr25/">Linkedin</Link>
                  </button>
                  <button className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-400 text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200">
                    <Github className="w-4 h-4" />
                    <Link href="https://github.com/ayushv-nitj">Github</Link>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white py-14">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-5">
          {/* Title */}
          <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
            NIT Jamshedpur CMS
          </h4>

          {/* Tagline */}
          <p className="text-slate-400 text-sm">
            Resolving campus issues — one complaint at a time.
          </p>

          {/* Made with */}
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> by Ayush Verma
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

          {/* Links */}
          <nav className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-indigo-400 text-sm transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-slate-600 text-xs">
            © 2026 NIT Jamshedpur Complaint Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}