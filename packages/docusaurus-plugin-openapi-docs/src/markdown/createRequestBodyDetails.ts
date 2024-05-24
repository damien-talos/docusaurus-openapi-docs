/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { createRequestSchema } from "./createRequestSchema";
import { MediaTypeObject } from "../openapi/types";

interface Props {
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

export function createRequestBodyDetails({
  title,
  body,
  depthTillCollapsed,
}: Props) {
  return createRequestSchema({ title, body, depthTillCollapsed });
}
