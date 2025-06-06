import { FormSectionHeader } from "@src/react-app/components/form/ProcedureForm/FormSectionHeader";
import React, { type ReactNode } from "react";

export function FormSection({
  children,
  title,
  topRightElement,
  titleClassName,
}: {
  children: ReactNode;
  title: string;
  topRightElement?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between bg-white px-4 py-2 shadow-sm">
        <FormSectionHeader className={titleClassName}>
          {title}
        </FormSectionHeader>
        {topRightElement}
      </div>
      <div className="flex flex-col space-y-2 p-4"> {children}</div>
    </div>
  );
}
