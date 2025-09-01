import { a as defineEventHandler } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';

const invalidate_post = defineEventHandler(async (event) => {
  return { success: true, message: "All i18n cache invalidated" };
});

export { invalidate_post as default };
//# sourceMappingURL=invalidate.post.mjs.map
