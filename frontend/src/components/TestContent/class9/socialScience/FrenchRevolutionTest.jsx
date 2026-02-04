import React from "react";

const FrenchRevolutionTest = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 font-serif">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">HISTORY</h1>
                <h2 className="text-xl font-semibold">SOCIAL SCIENCE – CLASS IX</h2>
                <h3 className="text-lg font-semibold mt-2">TEST – I</h3>

                <div className="flex justify-between mt-4 text-sm">
                    <span><strong>Maximum Marks:</strong> 50</span>
                    <span><strong>Time:</strong> 1:30 Hours</span>
                </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
                <h4 className="font-bold underline">General Instructions:</h4>
                <p>Chapter included:</p>
                <ul className="list-disc ml-6">
                    <li>The French Revolution</li>
                </ul>
            </div>

            {/* Section A */}
            <section className="mb-6">
                <h4 className="font-bold">
                    Section A – Very Short Answer Questions (1 × 6 = 6 marks)
                </h4>
                <p className="italic">Answer any SIX of the following:</p>
                <ol className="list-decimal ml-6 mt-2 space-y-1">
                    <li>Which event on 14 July 1789 marked the beginning of the French Revolution?</li>
                    <li>Name the tax paid directly to the state by the Third Estate.</li>
                    <li>What was the Old Regime?</li>
                    <li>Who wrote the pamphlet “What is the Third Estate?”</li>
                    <li>What was the name of the political club led by Robespierre?</li>
                    <li>What is meant by a republic?</li>
                </ol>
            </section>

            {/* Section B */}
            <section className="mb-6">
                <h4 className="font-bold">
                    Section B – Short Answer Questions (2 × 6 = 12 marks)
                </h4>
                <p className="italic">Answer any SIX of the following:</p>
                <ol start={7} className="list-decimal ml-6 mt-2 space-y-1">
                    <li>Describe any three causes of the subsistence crisis in France during the Old Regime.</li>
                    <li>Explain the role of the middle class in bringing about the French Revolution.</li>
                    <li>What was the Tennis Court Oath? Why was it important?</li>
                    <li>Describe any three features of the Constitution of 1791.</li>
                    <li>
                        How did revolutionary governments bring changes in the everyday life of the people?
                    </li>
                    <li>Explain the role of women in the French Revolution.</li>
                </ol>
            </section>

            {/* Section C */}
            <section className="mb-6">
                <h4 className="font-bold">
                    Section C – Short Answer Questions (3 × 3 = 9 marks)
                </h4>
                <p className="italic">Answer any THREE of the following:</p>
                <ol start={13} className="list-decimal ml-6 mt-2 space-y-1">
                    <li>
                        Describe the society of estates in France before 1789. How was the Third Estate burdened?
                    </li>
                    <li>
                        Explain the main ideas contained in the Declaration of the Rights of Man and Citizen.
                    </li>
                    <li>
                        Describe the Reign of Terror and the role of Robespierre in it.
                    </li>
                </ol>
            </section>

            {/* Section D */}
            <section>
                <h4 className="font-bold">
                    Section D – Long Answer Questions (3 × 1 = 3 marks)
                </h4>
                <p className="italic">Answer any ONE question:</p>

                <div className="ml-6 mt-3">
                    <p className="italic">
                        “Men are born and remain free and equal in rights. The aim of every political
                        association is the preservation of the natural and inalienable rights of man.”
                    </p>

                    <ol className="list-[lower-alpha] ml-6 mt-2 space-y-1">
                        <li>Name the document from which this extract is taken.</li>
                        <li>Mention any two natural rights stated in the document.</li>
                        <li>According to the declaration, where does sovereignty reside?</li>
                        <li>Which social group mainly benefited from these rights initially?</li>
                        <li>Why did women feel disappointed by this declaration?</li>
                    </ol>
                </div>
            </section>
        </div>
    );
};

export default FrenchRevolutionTest;
