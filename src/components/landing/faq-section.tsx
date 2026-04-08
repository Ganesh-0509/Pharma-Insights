import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What kind of data sources do you use?",
        answer: "We integrate data from a wide range of sources, including PubMed for scientific literature, ClinicalTrials.gov for trial information, and various patent databases. Our AI models are trained to synthesize this information effectively.",
    },
    {
        question: "Is my proprietary data secure?",
        answer: "Absolutely. We take data security very seriously. Your uploaded internal documents are processed in a secure environment and are only used for generating insights for your specific queries. We do not use your data to train our models.",
    },
    {
        question: "How does the AI generate repurposing suggestions?",
        answer: "Our AI uses advanced natural language processing and machine learning models to analyze molecular structures, mechanisms of action, and disease pathways. It identifies novel connections and potential therapeutic uses that may not be obvious through manual research.",
    },
    {
        question: "Can I customize the generated reports?",
        answer: "Currently, you can choose between PDF and Excel formats. We are actively working on adding more customization options to the report generation feature based on user feedback.",
    },
    {
        question: "Who is this platform for?",
        answer: "Pharma Insights Explorer is designed for drug discovery scientists, clinical researchers, business development professionals, and anyone in the pharmaceutical and biotech industries looking to accelerate their research and development process.",
    },
]


export function FaqSection() {
    return (
        <section id="faq" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Frequently Asked Questions</h2>
                    <p className="mt-2 text-lg leading-8 text-muted-foreground">
                        Have a different question? <a href="#contact" className="text-primary hover:underline">Contact us</a>.
                    </p>
                </div>
                <div className="mt-16 mx-auto max-w-4xl">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
