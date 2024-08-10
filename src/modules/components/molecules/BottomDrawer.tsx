import clsx from 'clsx';
import React, { useState, useRef, TouchEvent, MouseEvent } from 'react';

interface BottomDrawerProps {
    height?: string;
    children: React.ReactNode
    defaultOpen?: boolean

}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
    }
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      const touchY = e.touches[0].clientY;
      setCurrentY(touchY);
      const diffY = touchY - startY;
      if (drawerRef.current) {
        const translateY = open ? diffY : 100 + diffY;
        drawerRef.current.style.transform = `translateY(${Math.max(0, translateY)}%)`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'transform 0.3s ease';
      const diffY = currentY - startY;
      if (open && diffY > 50) {
        setOpen(false);
      } else if (!open && diffY < -50) {
        setOpen(true);
      } else {
        drawerRef.current.style.transform = open ? 'translateY(0)' : 'translateY(100%)';
      }
    }
    setCurrentY(0);
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleDrawer} />}
      <div
        ref={drawerRef}
        className={clsx(
          'fixed bottom-0 left-0 w-full bg-white shadow-lg z-50',
          { 'translate-y-full': !open },
          'transition-transform duration-300'
        )}
        style={{ transform: open ? 'translateY(0)' : 'translateY(100%)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-5 w-full cursor-grab flex justify-center items-center">
          <span className="block w-12 h-1 bg-gray-500 rounded-full" />
        </div>
        <div className="p-4">
          <button onClick={toggleDrawer}>Close</button>
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomDrawer
