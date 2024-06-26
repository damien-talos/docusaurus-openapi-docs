/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { createDescription } from "./createDescription";
import { createMethodEndpoint } from "./createMethodEndpoint";
import { createRequestBodyDetails } from "./createRequestBodyDetails";
import { createStatusCodes } from "./createStatusCodes";
import { create } from "./utils";
import { MediaTypeObject } from "../openapi/types";
import { ApiItem } from "../types";

interface Props {
  callbacks: ApiItem["callbacks"];
  depthTillCollapsed: number;
}

interface RequestBodyProps {
  title: string;
  body: {
    content?: {
      [key: string]: MediaTypeObject;
    };
    description?: string;
    required?: boolean;
  };
  depthTillCollapsed: number;
}

export function createCallbacks({ callbacks, depthTillCollapsed }: Props) {
  if (callbacks === undefined) {
    return undefined;
  }

  const callbacksNames = Object.keys(callbacks);
  if (callbacksNames.length === 0) {
    return undefined;
  }

  return create("div", {
    children: [
      create("div", {
        className: "openapi__divider",
      }),
      create("h2", {
        children: "Callbacks",
        id: "callbacks",
      }),
      create("OperationTabs", {
        className: "openapi-tabs__operation",
        children: callbacksNames.flatMap((name) => {
          const path = Object.keys(callbacks[name])[0];
          const methods = new Map([
            ["delete", callbacks[name][path].delete],
            ["get", callbacks[name][path].get],
            ["head", callbacks[name][path].head],
            ["options", callbacks[name][path].options],
            ["patch", callbacks[name][path].patch],
            ["post", callbacks[name][path].post],
            ["put", callbacks[name][path].put],
            ["trace", callbacks[name][path].trace],
          ]);

          return Array.from(methods).flatMap(([method, operationObject]) => {
            if (!operationObject) return [];

            const { description, requestBody, responses } = operationObject;

            return [
              create("TabItem", {
                label: `${method.toUpperCase()} ${name}`,
                value: `${method}-${name}`,
                "data-depthTillCollapsed": depthTillCollapsed,
                children: [
                  createMethodEndpoint(method, path),
                  // TODO: add `deprecation notice` when markdown support is added
                  createDescription(description),
                  createRequestBodyDetails({
                    title: "Body",
                    body: requestBody,
                  } as RequestBodyProps),
                  createStatusCodes({
                    id: "callbacks-responses",
                    label: "Callbacks Responses",
                    responses,
                    depthTillCollapsed: depthTillCollapsed - 1,
                  }),
                ],
              }),
            ];
          });
        }),
      }),
    ],
  });
}
