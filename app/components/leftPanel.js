import React from "react";

export default function LeftPanel() {
  return (
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt="Night"
        src="https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1987&q=80"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="hidden lg:relative lg:block lg:p-12">
        <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          ZezaLinks 🔗
        </h3>
        <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Weave the Web with ZezaLinks !
        </h3>

        <p className="mt-4 leading-relaxed text-white/90">
          🔗 ZezaLinks - Your Gateway to Compact URLs! Seamlessly transform long
          web addresses into concise, shareable links with our ExpressJS and
          Next.js powered link shortener. Simplify your digital presence today!
          🚀
        </p>
      </div>
    </section>
  );
}
