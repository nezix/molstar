

import { loadCheckpoint } from '../../../mol-util/debug';
loadCheckpoint(`mol-repr/structure/representation/gaussian-volume.ts::start`);
/**
 * Copyright (c) 2018-2021 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { ParamDefinition as PD } from '../../../mol-util/param-definition';
import { GaussianDensityVolumeParams, GaussianDensityVolumeVisual, UnitsGaussianDensityVolumeParams, UnitsGaussianDensityVolumeVisual } from '../visual/gaussian-density-volume';
import { StructureRepresentation, StructureRepresentationProvider, ComplexRepresentation, StructureRepresentationStateBuilder, UnitsRepresentation } from '../representation';
import { Representation, RepresentationParamsGetter, RepresentationContext } from '../../../mol-repr/representation';
import { ThemeRegistryContext } from '../../../mol-theme/theme';
import { Structure } from '../../../mol-model/structure';

const GaussianVolumeVisuals = {
    'gaussian-volume': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, GaussianDensityVolumeParams>) => ComplexRepresentation('Gaussian volume', ctx, getParams, GaussianDensityVolumeVisual),
    'units-gaussian-volume': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, UnitsGaussianDensityVolumeParams>) => UnitsRepresentation('Units-Gaussian volume', ctx, getParams, UnitsGaussianDensityVolumeVisual)
};

export const GaussianVolumeParams = {
    ...GaussianDensityVolumeParams,
    visuals: PD.MultiSelect(['gaussian-volume'], PD.objectToOptions(GaussianVolumeVisuals)),
};
export type GaussianVolumeParams = typeof GaussianVolumeParams
export function getGaussianVolumeParams(ctx: ThemeRegistryContext, structure: Structure) {
    const p = PD.clone(GaussianVolumeParams);
    p.jumpLength = PD.Numeric(4, { min: 0, max: 20, step: 0.1 });
    return p;
}

export type GaussianVolumeRepresentation = StructureRepresentation<GaussianVolumeParams>
export function GaussianVolumeRepresentation(ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, GaussianVolumeParams>): GaussianVolumeRepresentation {
    return Representation.createMulti('Gaussian Volume', ctx, getParams, StructureRepresentationStateBuilder, GaussianVolumeVisuals as unknown as Representation.Def<Structure, GaussianVolumeParams>);
}

export const GaussianVolumeRepresentationProvider = StructureRepresentationProvider({
    name: 'gaussian-volume',
    label: 'Gaussian Volume',
    description: 'Displays a gaussian molecular density using direct volume rendering.',
    factory: GaussianVolumeRepresentation,
    getParams: getGaussianVolumeParams,
    defaultValues: PD.getDefaultValues(GaussianVolumeParams),
    defaultColorTheme: { name: 'chain-id' },
    defaultSizeTheme: { name: 'physical' },
    isApplicable: (structure: Structure) => structure.elementCount > 0
});
loadCheckpoint(`mol-repr/structure/representation/gaussian-volume.ts::end`);
