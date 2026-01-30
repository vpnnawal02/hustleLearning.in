import React from 'react';
export default function NotesContent({ title, sections }) {
    return (
        <div className="w-full flex justify-center bg-gray-200 min-h-screen py-8">
            <div className="flex flex-col bg-white w-full sm:w-[80%] lg:w-[60%] px-8 py-10 gap-6 shadow-2xl rounded-md">

                <h1 className="uppercase text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
                    {title}
                </h1>

                {sections.map((section, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <h2 className="uppercase text-2xl sm:text-3xl font-semibold text-gray-800 mt-4">
                            {section.heading}
                        </h2>

                        {section.points.map((point, i) => (
                            <p key={i} className="text-base leading-relaxed text-gray-700">
                                {point}
                            </p>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    );
}
