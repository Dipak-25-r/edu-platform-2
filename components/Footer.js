'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">📚</span>
              </div>
              <span className="font-display font-bold text-xl text-white">EduPlatform</span>
            </div>
            <p className="text-sm">Smart Tools for Smart Students</p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="hover:text-primary transition-colors">Math Tools</Link></li>
              <li><Link href="/notes" className="hover:text-primary transition-colors">Study Notes</Link></li>
              <li><Link href="/ai-tools" className="hover:text-primary transition-colors">AI Tools</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <p className="text-sm mb-2">support@eduplatform.com</p>
            <p className="text-sm">© 2025 EduPlatform. All rights reserved.</p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          <p>100% Free • No Ads • Open Source</p>
        </div>
      </div>
    </footer>
  )
}
