import ObjectIcon from "@mui/icons-material/DataObjectOutlined";
import type { ParsedInputNode } from "@src/parse/parseNodeTypes";
import { Field } from "@src/react-app/components/form/Field";
import React, { type ReactNode } from "react";
import type { Control } from "react-hook-form";
import { InputGroupContainer } from "../../InputGroupContainer";
import { useRenderOptions } from "../../contexts/OptionsContext";

export function ObjectField({
  label,
  control,
  node,
  topLevel,
  overrideIconElement,
}: {
  label: string;
  control: Control<any>;
  node: ParsedInputNode & { type: "object" };
  topLevel?: boolean;
  overrideIconElement?: ReactNode;
}) {
  const { transformer } = useRenderOptions();
  if (topLevel) {
    return (
      <div className={"flex flex-col space-y-2 p-1 "}>
        {Object.entries(node.children).map(([name, e]) => (
          <Field
            inputNode={{
              ...e,
              path:
                transformer === "superjson"
                  ? ["json", ...node.path.concat([name])]
                  : node.path.concat([name]),
            }}
            control={control}
            key={name}
          />
        ))}
      </div>
    );
  }
  const renderField = () => {
    try {
      return Object.entries(node.children).map(([childFieldName, e]) => (
        <Field
          inputNode={{
            ...e,
            path: node.path.concat([childFieldName]),
          }}
          control={control}
          key={childFieldName}
        />
      ));
    } catch (e) {
      return (
        <div>
          <h1 className="font-semibold text-error text-xl">
            Field Rendering Error
          </h1>
          Unfortunately, trpc-ui is unable to render the requested zod field.
          Not all zod validators are fully supported.{" "}
          <a
            href="https://github.com/aidansunbury/trpc-ui/issues/new?template=bug_report.md"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline visited:text-purple-600"
          >
            open an issue ↗
          </a>{" "}
          with the zod schema that caused this error so that it can be fixed.
        </div>
      );
    }
  };

  return (
    <InputGroupContainer
      title={label}
      iconElement={overrideIconElement ?? <ObjectIcon className="mr-1" />}
    >
      {renderField()}
    </InputGroupContainer>
  );
}
