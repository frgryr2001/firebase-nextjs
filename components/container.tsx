import classNames from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={classNames("mx-auto max-w-[1200px]", className)}>
      {children}
    </div>
  );
}
