"use client";

import { AppBar } from 'src/components/AppBar';
import { ValidatorTable } from './table';

const Page = () => {
  return (
    <div className="h-screen">
      <AppBar />
      <main className="grid place-items-center mx-auto mt-[120px] gap-8">
        <div className="px-8 py-2 bg-white shadow-lg rounded-lg">
          <ValidatorTable />
        </div>
      </main>
    </div>
  )
}

export default Page;
