import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[8rem] md:grid-cols-3',
        'transition-all duration-300 ease-in-out',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  icon
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group/bento relative row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-border bg-background py-4 px-6',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]',
        'hover:scale-[1.02] hover:-translate-y-1',
        'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100',
        className,
      )}
    >
      <div className='transition duration-300 group-hover/bento:translate-x-2'>
        {icon && (
          <div className='mb-4 text-primary'>
            {icon}
          </div>
        )}
        <div className='my-2 font-sans text-lg font-bold text-neutral-600 dark:text-neutral-200'>
          {title}
        </div>
        <div className='font-sans text-sm font-normal text-neutral-600/80 dark:text-neutral-300/80'>
          {description}
        </div>
      </div>
    </div>
  );
};
