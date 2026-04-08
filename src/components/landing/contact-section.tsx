import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
    return (
        <section id="contact" className="py-24 sm:py-32 bg-muted/20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact Us</h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
                <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-foreground">
                                First name
                            </label>
                            <div className="mt-2.5">
                                <Input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-foreground">
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <Input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-foreground">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-foreground">
                                Message
                            </label>
                            <div className="mt-2.5">
                                <Textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <Button type="submit" className="w-full">
                            Send message
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}
