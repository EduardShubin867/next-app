'use client';

import { Spinner } from 'flowbite-react';

export default function Loader() {
  return (
    <div className="text-center">
      <Spinner aria-label="Map is loading" />
    </div>
  );
}
