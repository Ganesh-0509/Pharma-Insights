import Image from 'next/image';

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 sm:py-32 bg-muted/20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">See It In Action</h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Watch a quick walkthrough of how Pharma Insights Explorer can streamline your research workflow and uncover hidden opportunities.
                    </p>
                </div>
            </div>
            <div className="mt-16 sm:mt-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flow-root">
                        <div className="-m-2 rounded-xl bg-muted/10 p-2 ring-1 ring-inset ring-primary/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <Image
                                src="https://picsum.photos/seed/demo/1200/600"
                                alt="App screenshot"
                                width={2432}
                                height={1442}
                                className="rounded-md shadow-2xl ring-1 ring-foreground/10"
                                data-ai-hint="dashboard"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
