import React, { useEffect } from 'react';
import AOS from 'aos';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  return (
    <>
      <main className="grow">{children}</main>
    </>
  );
}
