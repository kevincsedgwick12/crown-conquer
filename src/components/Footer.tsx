const FOOTER_LINKS = {
  Shop:     ['Hoodies', 'Shorts', 'T-Shirts', "Women's", 'New Arrivals'],
  About:    ['Our Story', 'Athletes', 'Sustainability', 'Careers'],
  Support:  ['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQ'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

const SOCIALS = ['Instagram', 'TikTok', 'YouTube', 'Twitter']

export default function Footer() {
  return (
    <footer className="relative bg-crown-black border-t border-crown-border">
      {/* Main footer content */}
      <div className="px-6 md:px-16 pt-20 pb-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="font-heading text-2xl tracking-widest2 text-crown-white block mb-5">
              C&amp;C
            </a>
            <p className="text-[11px] text-crown-muted leading-loose tracking-wide max-w-[160px]">
              Premium athletic apparel built for the relentless.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[9px] tracking-widest uppercase text-crown-ash mb-5 font-medium">
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="
                        text-[11px] text-crown-muted tracking-wide
                        hover:text-crown-white transition-colors duration-250
                        cursor-none
                      "
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="
          flex flex-col md:flex-row items-center justify-between
          gap-5 pt-8 border-t border-crown-border/50
        ">
          {/* Copyright */}
          <p className="text-[9px] tracking-widest uppercase text-crown-muted order-2 md:order-1">
            © 2025 Crown &amp; Conquer. All rights reserved.
          </p>

          {/* Brand wordmark */}
          <span className="font-heading text-lg tracking-widest2 text-crown-white/20 order-1 md:order-2">
            CROWN &amp; CONQUER
          </span>

          {/* Socials */}
          <div className="flex gap-6 order-3">
            {SOCIALS.map(s => (
              <a
                key={s}
                href="#"
                className="
                  text-[9px] tracking-widest uppercase text-crown-muted
                  hover:text-crown-white transition-colors duration-300 cursor-none
                "
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
