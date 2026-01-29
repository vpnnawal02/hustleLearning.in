export default function FrenchRevolution() {
    return (
        <div className="w-full flex justify-center bg-gray-100 min-h-screen py-8">
            <div className="flex flex-col bg-white w-full sm:w-[85%] lg:w-[70%] px-8 sm:px-12 py-10 gap-8 shadow-2xl rounded-lg">

                {/* Title */}
                <h1 className="uppercase text-4xl sm:text-5xl font-bold text-gray-900 border-b-4 border-yellow-400 pb-4">
                    The French Revolution
                </h1>

                {/* Introduction Section */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                        The French Revolution
                    </h2>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p>In 1789, Paris was in a state of alarm as rumours spread that the King would open fire upon citizens.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>People gathered and broke into government buildings in search of arms.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>The commander of the Bastille was killed and prisoners were released.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p>People hated the Bastille as it stood for the despotic power of the king. People protested against the high price of bread. A new chain of events began, which led to the execution of the King in France.</p>
                        </li>
                    </ul>
                </section>

                {/* Add an image example */}
                <div className="my-6">
                    <img
                        src="/images/bastille-storming.jpg"
                        alt="Storming of the Bastille"
                        className="w-full rounded-lg shadow-lg"
                    />
                    <p className="text-sm text-gray-500 text-center mt-2 italic">
                        The Storming of the Bastille, July 14, 1789
                    </p>
                </div>

                {/* French Society Section */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                        French Society During the Late Eighteenth Century
                    </h2>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p>Louis XVI ascended the throne in 1774.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>France was financially drained due to wars, including support to American colonies.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>Taxes were increased to meet government expenses.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p>French society was divided into three estates under the feudal system.</p>
                        </li>
                    </ul>

                    {/* Custom Table Example */}
                    <div className="my-6 overflow-x-auto text-black">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead className="bg-yellow-100">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Estate</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Members</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Privileges</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">First Estate</td>
                                    <td className="border border-gray-300 px-4 py-2">Clergy</td>
                                    <td className="border border-gray-300 px-4 py-2">Tax exempt</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Second Estate</td>
                                    <td className="border border-gray-300 px-4 py-2">Nobility</td>
                                    <td className="border border-gray-300 px-4 py-2">Tax exempt</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 font-semibold">Third Estate</td>
                                    <td className="border border-gray-300 px-4 py-2">Peasants, Workers, Middle Class</td>
                                    <td className="border border-gray-300 px-4 py-2">Paid all taxes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* The Struggle to Survive */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                        The Struggle to Survive
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                        <li>Population growth increased the demand for food grains.</li>
                        <li>Grain production could not keep pace with demand, raising bread prices.</li>
                        <li>Low wages widened the gap between rich and poor.</li>
                        <li>Drought and hail worsened the condition of the poor.</li>
                    </ul>
                </section>

                {/* Highlighted Box Example */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">💡 Key Point</h3>
                    <p className="text-gray-700">
                        The financial crisis combined with social inequality created the perfect conditions for revolution.
                    </p>
                </div>

                {/* Continue with other sections... */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                        A Growing Middle Class
                    </h2>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                        <li>• Peasants revolted against taxes and food scarcity.</li>
                        <li>• The third estate became prosperous and educated.</li>
                        <li>• The middle class earned wealth through trade and manufacturing.</li>
                        <li>• They believed no group should be privileged by birth.</li>
                        <li>• Rousseau proposed a government based on a social contract.</li>
                        <li>• Montesquieu proposed division of powers among legislature, executive and judiciary.</li>
                    </ul>
                </section>

                {/* Quote Box Example */}
                <blockquote className="border-l-4 border-gray-400 pl-6 my-6 italic text-gray-600">
                    "Man is born free, and everywhere he is in chains." - Jean-Jacques Rousseau
                </blockquote>

                {/* Add remaining sections following the same pattern... */}

            </div>
        </div>
    );
}
