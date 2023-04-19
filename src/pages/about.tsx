import * as React from "react";

import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";

export default function About() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            About
          </div>
        </section>
      </main>
    </Layout>
  );
}
