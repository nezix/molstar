

import { loadCheckpoint } from '../../../mol-util/debug';
loadCheckpoint(`mol-gl/shader/chunks/assign-clipping-varying.glsl.ts::start`);
export const assign_clipping_varying = `
#if dClipObjectCount != 0 && defined(dClipping)
    #if defined(dClippingType_instance)
        vClipping = readFromTexture(tClipping, aInstance, uClippingTexDim).a;
    #elif defined(dMarkerType_groupInstance)
        vClipping = readFromTexture(tClipping, aInstance * float(uGroupCount) + group, uClippingTexDim).a;
    #endif
#endif
`;
loadCheckpoint(`mol-gl/shader/chunks/assign-clipping-varying.glsl.ts::end`);
