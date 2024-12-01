import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useKeypress from 'react-use-keypress';
import SharedModal from '../sharedmodal';

export default function Modal({
  images,
  index,
  onClose
}: {
  images: any[];
  index: number;
  onClose: () => void;
}) {
  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function changePhotoId(newVal: number) {
    setDirection(newVal > curIndex ? 1 : -1);
    setCurIndex(newVal);
  }

  useKeypress('Escape', () => {
    onClose();
  });

  useKeypress('ArrowRight', () => {
    if (curIndex + 1 < images.length) {
      changePhotoId(curIndex + 1);
    }
  });

  useKeypress('ArrowLeft', () => {
    if (curIndex > 0) {
      changePhotoId(curIndex - 1);
    }
  });

  return (
    <Dialog
      static
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <button 
      type="button"
        className="fixed inset-0" 
        onClick={onClose} 
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }} 
      >
        <motion.div
          key="backdrop"
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </button>

      {/* Center the modal content */}
      <Dialog.Panel 
      as='div'
        className="fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <SharedModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={onClose}
        />
      </Dialog.Panel>
    </Dialog>
  );
}
