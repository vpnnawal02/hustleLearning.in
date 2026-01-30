import storming_at_bastille from '../../../../assets/imgs/class_9/history/french_revolution/storming_of_bastille.jpg'

export default function FrenchRevolution() {
    return (
        <div className="w-full flex justify-center bg-gray-100 min-h-screen py-8 text-gray-700">
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
                    <ul className="space-y-1 text-gray-700 leading-relaxed">
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
                <div className="my-6 flex flex-col items-center">
                    <img
                        src={storming_at_bastille}
                        alt="Storming of the Bastille"
                        className="w-full lg:w-[50%] rounded-lg shadow-lg"
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
                    <ul className="space-y-1 text-gray-700 leading-relaxed">
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p>Louis XVI, in 1774, ascended the throne of France.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>Financial France was drained because of the war. France, under Louis XVI, helped the thirteen
                                American colonies to gain their independence from Britain.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>Taxes were increased to meet regular expenses, such as the cost of maintaining an army, the
                                court, and running government offices or universi es. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p>The country of France was divided into three estates in the eighteenth century. The feudal
                                system was part of the society’s estates da ng back to the middle ages.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p>90 percent of the popula on was dominated by peasants, but only a small number of them
                                owned the land they cul vated. 60 percent was owned by nobles, the Church and other richer
                                members of the third estate. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">f.</span>
                            <p>
                                The clergy and the nobility, members of the first two estates, enjoyed certain privileges by
                                birth. These groups of members were exempted from paying taxes and enjoyed feudal
                                privileges. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">g.</span>
                            <p>All members of the third estate had to pay taxes to the state, which included a direct tax, called
                                taille, and a number of indirect taxes, which were levied on ar cles of everyday consump on
                                like salt or tobacco.</p>
                        </li>
                    </ul>
                    {/* Table */}
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

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            The Struggle to Survive
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p>The increase in popula on led to a rapid increase in the requirement for food grains.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>Produc on of grains could not keep pace with the demand, due to which the price of bread rose
                                rapidly. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>Due to the low wages paid to the labourers, the gap between the poor and the rich widened.
                                Things became worse whenever drought or hail reduced the harvest. </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            A Growing Middle Class Envisages an End to Privileges
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p>Peasants used to par cipate in revolts against taxes and food scarcity.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>The group of the third estate had become prosperous and had access to educa on and new
                                ideas. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>In the eighteenth century, new social groups emerged, termed the middle class, who earned
                                their wealth through expanding overseas trade and by manufacturing woollen and silk tex les
                                that were either exported or bought by the richer members of society. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p>The third estate included professions such as lawyers or administra ve officials. A person’s
                                social posi on was dependent on their merit. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p>All these groups were educated and believed that no group in society should be privileged by
                                birth.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">f.</span>
                            <p>A new form of government was proposed by Rousseau based on a social contract between
                                people and their representa ves.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">g.</span>
                            <p> Similarly, Montesquieu proposed a division of power within the government between the
                                legisla ve, the execu ve and the judiciary.  </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            The Outbreak of the Revolu on
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> In France, the monarch didn’t have the power to impose taxes. They had to call a mee ng of the
                                Estates-General, a poli cal body to which the three estates sent their representa ves, to pass
                                proposals for new taxes.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>Louis XVI, on 5 May 1789, called an assembly to pass proposals for new taxes.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>Representa ves from the first and second estates were present, and the third estate was
                                represented by its prosperous and educated members.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p>According to the principle, each estate had one vote. But, representa ves from the third estate
                                demanded each member would have one vote. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p>The demand was rejected, so members of the third estate walked out to protest. They swore
                                not to disperse ll a cons tu on was dra ed for France that would limit the powers of the
                                monarch.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">f.</span>
                            <p>Due to the severe winter, bread prices rose, and people had to spend hours in long queues.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">g.</span>
                            <p>Rumours spread that the lords of the manor hired bands of brigands to destroy the ripe crops. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">h.</span>
                            <p>In fear, peasants started loo ng hoarded grain and burnt down documents containing records of
                                manorial dues. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">i.</span>
                            <p>Nobles fled from their homes. Louis XVI accorded recogni on to the Na onal Assembly and
                                accepted the principle that his powers would, from now on, be checked by a cons tu on.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">j.</span>
                            <p>The Assembly passed a decree abolishing the feudal system of obliga ons and taxes on 4 August
                                1789. Tithes were abolished, and lands owned by the Church were confiscated. </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            France Becomes a Constitional Monarchy
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> In 1791, The Na onal Assembly completed the dra of the cons tu on, and its main object was
                                to limit the powers of the monarch. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p> These powers were now separated and assigned to different ins tu ons – the legislature,
                                execu ve and judiciary. France became a cons tu onal monarchy. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p> Citizens voted for a group of electors, who in turn chose the Assembly, but unfortunately, not
                                every ci zen had the right to vote. Men above 25 years of age who paid taxes equal to at least 3
                                days of a labourer’s wage were en tled to vote. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p> The Constitution began with a Declara on of the Rights of Man and Ci zen. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p> Rights such as the right to life, freedom of speech, freedom of opinion, and equality before the
                                law were established as ‘natural and inalienable’ rights; that is, they belonged to each human
                                being by birth and could not be taken away. </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            France Abolishes Monarchy and Becomes a Republic
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> In April 1792, the National Assembly voted for a war against Prussia and Austria. Marseillaise
                                became the na onal anthem of France. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p> While men were away figh ng in the war, women took care of their families. Large sections of
                                the popula on demanded that the revolu on had to be carried further, as the Cons tu on of
                                1791 gave political rights only to the richer sec ons of society.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p> Political clubs were formed, and among them, Jacobins became the most successful club.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p> Members of the Jacobin club included small shopkeepers, ar sans such as shoemakers, pastry
                                cooks, watch-makers, printers, as well as servants and daily-wage workers.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p> Jacobin members started wearing long striped trousers similar to those worn by dockworkers.
                                These Jacobins were called the sans-culo es, literally meaning ‘those without knee breeches’. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">f.</span>
                            <p>
                                On August 10 1792, Jacobins stormed the Palace of the Tuileries and held the king hostage for
                                several hours. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">g.</span>
                            <p>Elec ons were held, and all men of 21 years and above got the right to vote. The monarchy was
                                abolished on 21 September 1792, and France was declared a republic. Louis XVI was sentenced
                                to death by a court on the charge of treason. </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            The Reign of Terror
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> The period from 1793 to 1794 is referred to as the Reign of Terror.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p> People whom Robespierre saw as enemies of the republic were arrested, imprisoned and then
                                tried by a revolu onary tribunal. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p> If they were declared guilty by the court, then they were guillo ned.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p> The guillo ne is a device consis ng of two poles and a blade with which a person is beheaded,
                                named a er Dr Guillo n. Laws were issued to place a maximum ceiling on wages and prices.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p> Meat and bread were ra oned. Expensive white flour was forbidden to use.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">f.</span>
                            <p>
                                Equality was prac sed through forms of speech and address.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">g.</span>
                            <p> All French men and women were addressed as Citoyen and Citoyenne (Ci zen). In July 1794, he
                                was convicted by a court, arrested and the next day sent to the guillo ne.  </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            A Directory Rules France
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> The fall of the Jacobin government allowed the wealthier middle classes to seize power.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>  According to the new cons tu on, non-proper ed sec ons of society were denied vo ng.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p> It provided for two elected legisla ve councils. The government appointed a Directory
                                consis ng of execu ves made up of five members.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p> Poli cal instability paved the way for a military dictator, Napoleon Bonaparte. </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            Did Women have a Revolution?
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> Women were ac ve par cipants from the beginning, which brought important changes in the
                                country of France. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>  Women from the third estate had to work for a living, and they didn’t have access to educa on
                                or job training.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p> Daughters of nobles of the third estate were allowed to study at a convent. Working women
                                also had to care for their families.  </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p> Compared to men, their wages were lower. Women also started their poli cal clubs and
                                newspapers.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p> The Society of Revolu onary and Republican Women was one of the most famous women’s
                                clubs. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">f.</span>
                            <p> They demanded equal poli cal rights as men, the right to vote and to hold poli cal office.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">g.</span>
                            <p> The revolu onary government introduced laws to improve the lives of women. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">h.</span>
                            <p> Schooling became compulsory, divorce was made legal, and they could run small businesses. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">i.</span>
                            <p> During the Reign of Terror, the government closed women’s clubs banning their poli cal
                                ac vi es. A er much struggle, women in France in 1946 won the right to vote.</p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            The Abolition of Slavery
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p>  Jacobin’s regime’s most revolu onary social reform was the aboli on of slavery in the French
                                colonies. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>In the seventeenth century, the slavery trade began. Slaves were brought from local chie ains,
                                branded and shackled and packed ghtly into ships for the three-month-long voyage across the
                                Atlan c to the Caribbean. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>Slave labour met the growing demand in European markets for sugar, coffee, and indigo. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p> Throughout the eighteenth century, there was li le cri cism of slavery in France. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p> In 1794, the Conven on legislated to free all slaves in the French overseas possessions.
                                Napoleon introduced slavery a er ten years. In 1848, slavery was abolished in French colonies. </p>
                        </li>
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            The Revolution and Everyday Life
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> France during 1789 saw changes in the lives of men, women and children.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>The aboli on of censorship happened in the summer of 1789. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>Declara on of the Rights of Man and Ci zen proclaimed freedom of speech and expression to
                                be a natural right.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p> Freedom of the press meant opposing views of events could be expressed. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">e.</span>
                            <p> Plays, songs and fes ve processions a racted large numbers of people. </p>
                        </li>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-3xl font-semibold text-gray-800 uppercase">
                            Conclusion
                        </h2>
                        <li className="flex gap-2">
                            <span className="font-semibold">a.</span>
                            <p> Napoleon Bonaparte crowned himself Emperor of France in 1804 and introduced many laws,
                                such as the protec on of private property and a uniform system of weights and measures
                                provided by the decimal system.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">b.</span>
                            <p>Napoleon was defeated at Waterloo in 1815. </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">c.</span>
                            <p>The ideas of liberty and democra c rights were the most important legacy of the French
                                Revolu on.</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="font-semibold">d.</span>
                            <p>Colonised peoples reworked the idea of freedom to create a sovereign na on-state.</p>
                        </li>
                    </section>
                </section>

            </div>
        </div>
    );
}
