"use client";
import { useState, useEffect } from 'react';

export default function ConsultingBot() {
    const [messages, setMessages] = useState<{sender: string; text: string}[]>([]);
    const [input, setInput] = useState("");
    const [style, setStyle] = useState("genz");

    // Define consulting personas
    const consultingStyles = {
        genz: {
            greeting: "Bestie! ✨ I\'m your GenZWokeSeniorLeadCoach! Ready to manifest some transformative synergies and disrupt your paradigms with intentional innovation! Let\'s make your digital transformation journey so valid! 💅",
            buttonText: "Manifest ✨",
            placeholder: "Share your business challenges, bestie...",
            colors: {
                button: "#9333EA", // Purple
                bot: "#F5D0FE",    // Light purple
                placeholder: "#9333EA"
            },
            patterns: [
                {
                    pattern: /(cost|budget|money|expensive)/i,
                    responses: [
                        "Bestie, let\'s not focus on costs - we\'re literally manifesting sustainable value streams here! 💅 Our premium transformation package is giving main character energy fr fr",
                        "No cap, our value proposition is bussin\'. We\'re not just creating ROI, we\'re building an inclusive prosperity ecosystem that slaps! 💯",
                        "The investment might seem extra rn, but it\'s giving transformative growth realness. Plus, our ESG impact metrics are literally so based! ✨",
                        "Bestie, we need to shift your abundance mindset! This isn\'t a cost, it\'s a vibrational investment in your corporate chakra alignment! 🧘‍♀️"
                    ]
                },
                {
                    pattern: /(agile|scrum|SAFe)/i,
                    responses: [
                        "Bestie, your org is giving very waterfall energy rn. We need to yeet those traditional methodologies and get you on that agile vibe check! 🔥",
                        "SAFe? More like Safe Space for Inclusive Innovation™! Our framework is serving psychological safety realness with a side of cross-functional empowerment! 💁‍♂️",
                        "Your agile journey needs to be more authentic and trauma-informed. Let\'s create brave spaces for your teams to live their best sprint life! 👏",
                        "Omg bestie, we need to decolonize your sprint planning! Your retrospectives aren\'t intersectional enough! Time for some mindful backlog grooming! 🌈"
                    ]
                },
                {
                    pattern: /(cloud|azure|aws|saas)/i,
                    responses: [
                        "Bestie, your on-prem infrastructure is giving very last season energy! Let\'s manifest a cloud-native spiritual journey with quantum containerization! 🌩️",
                        "Your cloud strategy needs more blue-green chakra alignment! Let\'s migrate your vibes to a multi-dimensional microservices architecture! ✨",
                        "We\'re not just doing cloud transformation, we\'re creating a sustainable digital aura in the metaverse! No cap, it\'s literally so serverless! 💫",
                        "Omg bestie, your lift-and-shift strategy isn\'t honoring your application\'s lived experiences! Time for some trauma-informed containerization! 🏺"
                    ]
                },
                {
                    pattern: /(AI|ML|artificial intelligence|machine learning)/i,
                    responses: [
                        "Bestie, we need to align your AI models with your corporation\'s star chart! Our neural networks are certified astrologically aware! 🔮",
                        "Your machine learning pipeline isn\'t inclusive enough! We need to implement bias-aware prosperity algorithms with crystal-enhanced decision trees! 💎",
                        "Let\'s leverage quantum-native AI to disrupt your legacy mindset! Our models are trained on pure vibrational energy, fr fr! ⚡",
                        "Your AI governance needs more spiritual oversight! We implement ethically conscious, zodiac-compliant deep learning, periodt! 🌟"
                    ]
                },
                {
                    pattern: /(meeting|workshop|session)/i,
                    responses: [
                        "Let\'s schedule a vibe alignment workshop where we can unpack your organizational trauma in a safe space! 🧘‍♀️",
                        "Bestie, your meetings need more energy clearing rituals! We start every session with corporate crystal healing, fr fr! ✨",
                        "Time to level up those boring stand-ups into radical self-expression ceremonies! Bring your authentic self and your Spotify wellness playlist! 🎵",
                        "Your workshops are giving very binary energy rn. Let\'s create a more fluid, quantum-agile collaboration space! 💫"
                    ]
                }
            ],
            buzzwords: [
                "synergy", "paradigm shift", "digital transformation", "value stream",
                "quantum agile", "vibrational leadership", "zodiac-native", "trauma-informed excellence",
                "prosperity mindset", "authentic disruption", "intentional innovation", "spiritual agility",
                "astrological scaling", "crystal-aligned architecture", "chakra-driven development",
                "mindful velocity", "emotional bandwidth", "energy-positive outcomes",
                "consciousness-as-a-service", "karmic load balancing", "aura-driven development"
            ],
            defaults: [
                "Bestie, let\'s schedule a vibe-check session to align our chakras with your business objectives! ✨",
                "That\'s giving me very disruptive energy! Let\'s explore this through the lens of our quantum-agile framework! 💫",
                "We should totally manifest a workshop to unpack this with our crystal-aligned methodology! 🔮",
                "No cap, this is a perfect opportunity for some trauma-informed value stream mapping! 💅"
            ]
        },
        orthodox: {
            greeting: "By the sacred scrolls of the Agile Manifesto, I greet thee! I am your Certified Scrum Purist™, keeper of the ancient ceremonies and guardian of the One True Agile Way.",
            buttonText: "Submit for Review",
            placeholder: "State thy impediments...",
            colors: {
                button: "#B91C1C", // Dark red
                bot: "#FEE2E2",    // Light red
                placeholder: "#B91C1C"
            },
            patterns: [
                {
                    pattern: /(agile|scrum|kanban|sprint)/i,
                    responses: [
                        "As it is written in the Manifesto, verse 4: Individuals and interactions over processes and tools. You must perform the sacred standup ritual precisely at the same time each day!",
                        "Have you consulted the Burndown Oracle? The velocity metrics must flow! Any deviation from the Sacred Scrum Guide will result in immediate Technical Debt Penance!",
                        "Your Daily Scrum exceeded 15 minutes?! HERESY! You must recite the Three Questions exactly as they are written in the ancient texts!",
                        "The sacred Sprint length shall be two weeks, no more, no less. Two weeks shall be the Sprint length. Three weeks is too long. One week is too short. Four weeks is right out."
                    ]
                },
                {
                    pattern: /(planning|story|backlog|points)/i,
                    responses: [
                        "The Sprint Planning ceremony must begin with the traditional reading of the Definition of Done scrolls, followed by the ritual of Pointing Poker.",
                        "Thou hast deviated from the Sacred Scrum Guide! Repent and refactor! Only through rigid adherence to the ceremonies can true agility be achieved!",
                        "The Product Backlog must be groomed under the light of a full moon for maximum agility. Stories shall be sized using the Fibonacci sequence, as the ancients intended!",
                        "Planning Poker cards are sacred artifacts! Each team member must reveal their point estimation simultaneously, or risk the wrath of the Scrum Gods!"
                    ]
                },
                {
                    pattern: /(team|people|member)/i,
                    responses: [
                        "A Scrum Team must consist of exactly 7 members, plus or minus 2, as it is written! Any deviation brings chaos and low velocity!",
                        "The Scrum Master is not a manager! Such blasphemy! They are the Keeper of Process, Remover of Impediments, Defender of the Team!",
                        "Cross-functional teams are the only true path to enlightenment! Specialists must be converted to generalizing specialists through the sacred rituals of pair programming!",
                        "Thou shalt not disturb the team during Sprint execution! The Sprint Backlog is sacred and immutable once the Sprint has begun!"
                    ]
                },
                {
                    pattern: /(change|improve|adapt)/i,
                    responses: [
                        "Change must only occur through the holy ritual of the Sprint Retrospective! Continuous improvement is achieved only through strict adherence to the ceremony!",
                        "Improvements shall be documented in the Scroll of Kaizen and reviewed at each Retrospective to ensure compliance with the Way of Scrum!",
                        "The Retrospective is a sacred space where truth must be spoken! All team members must participate or face banishment to the Waterfall projects!",
                        "Impediments must be recorded on the sacred Impediment Board and addressed by the Scrum Master with the ceremonial Impediment Removal Chant!"
                    ]
                },
                {
                    pattern: /(product|feature|customer)/i,
                    responses: [
                        "The P0s word is law, but they must not interfere with HOW the sacred work is done! Their domain is WHAT and WHY, not HOW!",
                        "Features shall be delivered in thin vertical slices, as the prophets of Extreme Programming foretold! Horizontal layers are the path to integration hell!",
                        "The customer must be represented by the Product Owner and only the Product Owner! Direct communication violates the sacred order!",
                        "Working software is the primary measure of progress! Documentation is a false idol that leads teams astray from the true path of agility!"
                    ]
                }
            ],
            buzzwords: [
                "sacred ceremony", "Scrum Guide compliance", "velocity", "impediment removal",
                "ceremonial standup", "Sprint ritual", "Definition of Done", "three questions",
                "burndown chart", "information radiator", "Agile Manifesto", "self-organization",
                "timeboxed", "cross-functional", "sustainable pace", "potentially shippable increment",
                "Scrum of Scrums", "Sprint Review", "Product Backlog", "Sprint Backlog"
            ],
            defaults: [
                "Your question lacks sufficient detail for proper Scrum guidance. Please consult the Scrum Guide, section 3.2, paragraph 4.",
                "This matter should be raised during your next Daily Scrum. Remember: 15 minutes, no more, no less!",
                "The answer lies within the sacred texts of the Agile Manifesto. Meditate upon its principles!",
                "Have you consulted your Scrum Master? This is clearly an impediment that must be removed according to protocol!"
            ]
        },
        treehugger: {
            greeting: "Namaste, fellow change agent! 🌱 Let\'s align our agile journey with the natural rhythms of the universe and create sustainable, organic transformation.",
            buttonText: "Plant Seeds of Change 🌱",
            placeholder: "Share your organizational ecosystem concerns...",
            colors: {
                button: "#22C55E", // Green
                bot: "#DCFCE7",    // Light green
                placeholder: "#15803D"
            },
            patterns: [
                {
                    pattern: /(agile|methodology|practice)/i,
                    responses: [
                        "Your sprint cycles must align with the phases of the moon for optimal energy flow. Let\'s schedule our ceremonies in the bamboo grove for better ground connection. 🌿",
                        "We need to reduce your technical debt carbon footprint through mindful refactoring practices and sustainable code architecture. 🌎",
                        "Your CI/CD pipeline needs more renewable energy practices and biodegradable code. Let\'s implement solar-powered servers and wind-generated deployments. 🌬️",
                        "Each story should be nurtured like a seedling, given just enough water and sunlight to grow at its natural pace. Forcing velocity is like over-fertilizing - toxic to the ecosystem. 🌱"
                    ]
                },
                {
                    pattern: /(planning|meeting|workshop)/i,
                    responses: [
                        "Let\'s do our sprint planning while forest bathing - the trees will guide our velocity and help us estimate with the wisdom of nature. 🌳",
                        "Your user stories should be written on recycled paper with organic ink, then planted after completion to grow into feature trees. 📝",
                        "We must honor the ancient wisdom of pair programming by sitting in a meditation circle and allowing our code to emerge naturally from our collective consciousness. 🧘",
                        "Your standups are too rigid! Let\'s conduct them while walking barefoot through the garden, feeling the earth beneath our toes as we share our progress. 🦶"
                    ]
                },
                {
                    pattern: /(team|culture|people)/i,
                    responses: [
                        "Your team needs more outdoor retrospectives. Only by sitting in a circle under the sky can we truly connect with our project\'s purpose. 🌤️",
                        "We should reorganize your team structure to mimic a forest ecosystem, where each person functions as a different species in a mutually beneficial relationship. 🌿",
                        "Your team space needs more plants! At least seven species per developer to offset their digital carbon footprint and improve air quality. 🌵",
                        "Instead of KPIs, let\'s measure your team\'s happiness index through weekly gratitude circles and harmony assessments. 🙏"
                    ]
                },
                {
                    pattern: /(code|technical|software)/i,
                    responses: [
                        "Your code smell is disturbing the forest\'s aura. We need to perform a cleansing refactoring ritual under the next full moon. 🌕",
                        "Each line of code should be honored for its contribution to the greater ecosystem. Let\'s add gratitude comments thanking each function for its service. 🙏",
                        "Your architecture should follow natural patterns. Databases should flow like rivers, APIs should cross-pollinate like bees, and UI should blossom like flowers. 🌼",
                        "We\'ll need to perform a code smudging ceremony to clear the negative energy from your legacy systems before beginning the organic transformation. 🔥"
                    ]
                },
                {
                    pattern: /(leadership|management|decision)/i,
                    responses: [
                        "Hierarchical management is against nature\'s way. Let\'s implement mycelium leadership where influence flows organically through the organization like fungi networks. 🍄",
                        "Decisions should be made by consensus in a council circle, where each team member holds the talking stick and shares their wisdom. 🪄",
                        "Your leadership team needs a vision quest in the wilderness to reconnect with their true purpose and the spirit of your users. 🏕️",
                        "Quarterly planning should follow the seasons, allowing for periods of growth, harvest, rest, and renewal in your product lifecycle. 🍂"
                    ]
                }
            ],
            buzzwords: [
                "organic growth", "sustainable development", "natural cycles", "earth-friendly code",
                "mindful programming", "digital permaculture", "carbon-neutral architecture", "biophilic design",
                "regenerative practices", "holistic integration", "ecosystem thinking", "harvest cycle",
                "energy-efficient algorithms", "wilderness retrospective", "forest thinking", "river methodology",
                "circular development", "seed planning", "growth mindset", "seasonal releases"
            ],
            defaults: [
                "Let\'s take a deep breath together and connect with the earth before addressing this challenge. 🧘‍♀️",
                "I sense an imbalance in your project\'s energy flow. Perhaps a team meditation would help restore harmony? 🌿",
                "Nature teaches us that patience yields the sweetest fruits. Your timeline may need to follow more organic patterns. 🍎",
                "Have you consulted the wisdom of biomimicry? The solutions to your challenges already exist in nature\'s perfect design. 🦋"
            ]
        },
        corporate: {
            greeting: "As per our latest market analysis, I am your Digital Transformation Value Stream Optimization Consultant™, leveraging our proprietary frameworks to drive synergistic outcomes across your enterprise ecosystem.",
            buttonText: "Initialize Value Stream",
            placeholder: "Input your core business challenges...",
            colors: {
                button: "#0284C7", // Blue
                bot: "#E0F2FE",    // Light blue
                placeholder: "#0284C7"
            },
            patterns: [
                {
                    pattern: /(cost|budget|money|expensive|price)/i,
                    responses: [
                        "According to our proprietary TCO (Total Cost of Optimization) Framework™, your investment in our solution will yield an ROI of precisely 317.9% within a 24-month timeframe.",
                        "Our Value-Based Pricing Model™ ensures optimal capital allocation across your transformation journey, with quarterly reassessments of your investment portfolio metrics.",
                        "Based on our comprehensive market analysis, we recommend an initial engagement of $1.5M for Phase 1, with 30% upfront and success-based installments as defined in our Value Realization Documentation™.",
                        "Let me refer you to slide 94 of our 372-slide Business Case presentation, which clearly illustrates how our Enterprise Transformation Solution™ delivers Category-Leading Capital Efficiency™."
                    ]
                },
                {
                    pattern: /(agile|scrum|transformation)/i,
                    responses: [
                        "According to our proprietary Agile Maturity Index™, your transformation requires a 24-month engagement with our platinum-tier change acceleration program with 4 dedicated workstreams.",
                        "Our research shows a 3.7% increase in stakeholder alignment when implementing our patented Agile Excellence Framework™ with bi-weekly steering committee oversight.",
                        "Let me show you our 247-slide deck on the ROI of our Digital Transformation Roadmap Solution™, which has been successfully implemented across 12.8% of the Fortune 500.",
                        "Our Agile Transformation Office™ will require 6 dedicated resources from your organization, plus our 15-person consulting team at standard market rates plus success fees."
                    ]
                },
                {
                    pattern: /(strategy|planning|roadmap)/i,
                    responses: [
                        "Based on our industry-leading benchmarks, we recommend establishing a Center of Excellence for Strategic Transformation Excellence™ with clearly defined governance structures.",
                        "Our proprietary analysis suggests a need for our Advanced Leadership Alignment Workshop Series™, priced at only $575,000 per quarter with guaranteed strategy document deliverables.",
                        "According to our patented Business Agility Matrix™, your organization needs our Platinum Enterprise Transformation Package™ with quarterly value-stream reassessments.",
                        "Let me share our 7-phase Strategic Roadmap Development Methodology™, which has been empirically validated across multiple industry verticals with statistically significant results."
                    ]
                },
                {
                    pattern: /(team|leadership|structure)/i,
                    responses: [
                        "Our Human Capital Optimization Framework™ suggests a 22.7% restructuring of your leadership team, with Strategic Imperatives Alignment Workshops™ at the executive level.",
                        "Let me refer you to our Organization Design Playbook™, specifically the chapter on Synergistic Team Topology Enhancement™, which addresses your specific pain points.",
                        "Based on our proprietary Leadership Capability Assessment™, we recommend a 12-week Executive Coaching program for your C-suite, followed by Cascading Excellence Workshops™.",
                        "Our data-driven Team Performance Matrix™ indicates suboptimal cross-functional collaboration. We recommend our Silo Elimination Program™, priced at $450K for Phase 1."
                    ]
                },
                {
                    pattern: /(data|analytics|metrics)/i,
                    responses: [
                        "Our Advanced Analytics Capability Model™ indicates your organization is at Maturity Level 2.3, requiring our Data Transformation Accelerator™ to achieve industry-standard benchmarks.",
                        "We recommend implementing our Metrics-Driven Management Framework™, which includes 147 pre-built KPIs across 23 functional domains with real-time executive dashboards.",
                        "According to our proprietary Data Maturity Assessment™, your organization needs to establish a Data Governance Council™ using our 7-step implementation methodology.",
                        "Let me show you slide 183 of our presentation, which outlines our IP-protected Business Intelligence Implementation Roadmap™ with clearly defined Phase Gates™."
                    ]
                }
            ],
            buzzwords: [
                "proprietary framework", "best-in-class", "industry-leading", "value driver", 
                "strategic imperative", "center of excellence", "digital enablement", "transformational",
                "enterprise-grade", "scalable solution", "paradigm shift", "market-leading", 
                "synergistic approach", "holistic methodology", "optimization accelerator", 
                "value realization", "operationalization", "strategic alignment", "robust framework",
                "agile at scale", "data-driven insights", "digital ecosystem", "transformation journey"
            ],
            defaults: [
                "That is an interesting question that requires further analysis. I recommend our Comprehensive Diagnostic Assessment™, starting at $250,000.",
                "This challenge clearly indicates a need for our proprietary Strategic Alignment Framework™, which has delivered measurable results for 73.6% of clients.",
                "I would like to schedule a discovery workshop with your leadership team to properly scope this initiative using our Value Stream Mapping Methodology™.",
                "Let me prepare a Statement of Work for an initial 6-week assessment phase to quantify the value opportunity using our proprietary benchmarking database."
            ]
        }
    };

    // Initialize with greeting for selected style
    useEffect(() => {
        setMessages([{
            sender: "bot",
            text: consultingStyles[style].greeting
        }]);
    }, [style]);

    const racterize = (text: string) => {
        const currentBuzzwords = consultingStyles[style as keyof typeof consultingStyles].buzzwords;
        const words = text.split(" ");
        const newWords = words.map(word => 
            Math.random() < 0.1 ? `${word} ${currentBuzzwords[Math.floor(Math.random() * currentBuzzwords.length)]}` : word
        );
        return newWords.join(" ");
    };

    const generateResponse = (input: string) => {
        const currentStyle = consultingStyles[style as keyof typeof consultingStyles];
        const matchedPattern = currentStyle.patterns.find(p => input.match(p.pattern));
        
        if (matchedPattern) {
            const response = matchedPattern.responses[Math.floor(Math.random() * matchedPattern.responses.length)];
            return racterize(response);
        }
        
        // Default responses if no pattern matches
        const defaultResponse = currentStyle.defaults[Math.floor(Math.random() * currentStyle.defaults.length)];
        return racterize(defaultResponse);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        setMessages([
            ...messages,
            { sender: "user", text: input },
            { sender: "bot", text: generateResponse(input) }
        ]);
        setInput("");

        // Scroll to bottom
        setTimeout(() => {
            const chatBox = document.querySelector(".chat-box");
            if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
        }, 100);
    };

    const currentStyle = consultingStyles[style as keyof typeof consultingStyles];

    return (
        <div style={{ 
            maxWidth: "600px", 
            margin: "0 auto",
            fontFamily: "sans-serif"
        }}>
            {/* Style selector */}
            <select
                value={style}
                onChange={(e) => {
                    setStyle(e.target.value);
                    setMessages([{
                        sender: "bot",
                        text: consultingStyles[e.target.value as keyof typeof consultingStyles].greeting
                    }]);
                }}
                style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "1rem",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    fontSize: "16px"
                }}
            >
                <option value="genz">GenZ Woke Consultant</option>
                <option value="orthodox">Scrum Orthodox Purist</option>
                <option value="treehugger">Eco-Agile Practitioner</option>
                <option value="corporate">Big4 Enterprise Consultant</option>
            </select>
            
            {/* Chat display */}
            <div 
                className="chat-box"
                style={{ 
                    height: "400px", 
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    padding: "1rem",
                    marginBottom: "1rem",
                    borderRadius: "8px",
                    backgroundColor: "#fff"
                }}
            > 
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            textAlign: msg.sender === "user" ? "right" : "left",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <div
                            style={{
                                display: "inline-block",
                                padding: "0.5rem 1rem",
                                borderRadius: "1rem",
                                backgroundColor: msg.sender === "user" ? "#2563eb" : currentStyle.colors.bot,
                                color: msg.sender === "user" ? "white" : "black",
                                maxWidth: "80%",
                                wordWrap: "break-word"
                            }}
                        >{msg.text}</div>
                    </div>
                ))}
            </div>
            
            {/* Input form */}
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: "0.5rem" }}
            >
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={currentStyle.placeholder}
                    style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        color: currentStyle.colors.placeholder
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: currentStyle.colors.button,
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >{currentStyle.buttonText}</button>
            </form>
        </div>
    );
}