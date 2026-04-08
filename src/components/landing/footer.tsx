import { Logo } from "@/components/logo"

export function Footer() {
    return (
        <footer className="bg-background">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
                <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                    <div className="pb-6">
                        <a href="#about" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                            About
                        </a>
                    </div>
                    <div className="pb-6">
                        <a href="#features" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                            Features
                        </a>
                    </div>
                    <div className="pb-6">
                        <a href="#contact" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                            Contact
                        </a>
                    </div>
                    <div className="pb-6">
                        <a href="#faq" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                            FAQ
                        </a>
                    </div>
                </nav>
                <div className="mt-10 flex justify-center space-x-10">
                    <Logo className="h-6 w-6" />
                </div>
                <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
                    &copy; {new Date().getFullYear()} Pharma Insights Explorer. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
