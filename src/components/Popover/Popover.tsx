import {
  FloatingArrow,
  FloatingPortal,
  Placement,
  arrow,
  offset,
  shift,
  useFloating
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ElementType, useId, useRef, useState } from 'react'

interface PopoverProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType //custom tag bọc popover
  initialOpen?: boolean
  placement?: Placement
}

const Popover = ({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: PopoverProps) => {
  const [open, setOpen] = useState<boolean>(initialOpen || false)
  const arrowRef = useRef(null)
  const { x, y, refs, context, strategy } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })

  const id = useId()
  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <Element
      className={className}
      ref={refs.setReference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: ''
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill='white'
                className='border-x-transparent border-t-transparent border-[-11px] absolute -translate-y-[-95%]'
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
