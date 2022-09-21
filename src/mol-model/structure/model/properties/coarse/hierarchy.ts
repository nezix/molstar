

import { loadCheckpoint } from '../../../../../mol-util/debug';
loadCheckpoint(`mol-model/structure/model/properties/coarse/hierarchy.ts::start`);
/**
 * Copyright (c) 2018-2022 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Column } from '../../../../../mol-data/db';
import { Segmentation } from '../../../../../mol-data/int';
import { ElementIndex, ChainIndex, EntityIndex } from '../../indexing';
import { SortedRanges } from '../../../../../mol-data/int/sorted-ranges';

export interface CoarsedElementKeys {
    /** Assign a key to each element */
    chainKey: ArrayLike<ChainIndex>,
    /** Assign a key to each element, index to the Model.entities.data table */
    entityKey: ArrayLike<EntityIndex>,

    /** Find index of the residue/feature element where seq_id is included */
    findSequenceKey(entityId: string, asym_id: string, seq_id: number): ElementIndex
    findChainKey(entityId: string, asym_id: string): ChainIndex

    /** Returns index or -1 if not present. */
    getEntityFromChain(cI: ChainIndex): EntityIndex
}

export interface CoarseElementData {
    count: number,
    /**
     * The entity identifier corresponding to this coarse object.
     * In mmCIF files, this points to entity_poly_seq.entity_id in the ENTITY_POLY category.
     */
    entity_id: Column<string>,
    /**
     * An asym/strand identifier corresponding to this coarse object.
     * In mmCIF files, this points to struct_asym.id in the STRUCT_ASYM category
     */
    asym_id: Column<string>,
    /**
     * The leading sequence index corresponding to this coarse object.
     * In mmCIF files, this points to entity_poly_seq.num in the ENTITY_POLY category.
     */
    seq_id_begin: Column<number>,
    /**
     * The trailing sequence index corresponding to this coarse object.
     * In mmCIF files, this points to entity_poly_seq.num in the ENTITY_POLY category.
     */
    seq_id_end: Column<number>,

    chainElementSegments: Segmentation<ElementIndex, ChainIndex>,
}

export interface CoarseRanges {
    polymerRanges: SortedRanges<ElementIndex>
    gapRanges: SortedRanges<ElementIndex>
}

export type CoarseElements = CoarsedElementKeys & CoarseElementData & CoarseRanges

export interface CoarseHierarchy {
    isDefined: boolean,
    spheres: CoarseElements,
    gaussians: CoarseElements
}

const EmptyCoarseElements: CoarseElements = {
    chainKey: [],
    entityKey: [],
    findSequenceKey: () => -1 as ElementIndex,
    findChainKey: () => -1 as ChainIndex,
    getEntityFromChain: () => -1 as EntityIndex,

    count: 0,
    entity_id: Column.Undefined(0, Column.Schema.str),
    asym_id: Column.Undefined(0, Column.Schema.str),
    seq_id_begin: Column.Undefined(0, Column.Schema.int),
    seq_id_end: Column.Undefined(0, Column.Schema.int),
    chainElementSegments: Segmentation.create([]),

    polymerRanges: SortedRanges.ofSortedRanges([]),
    gapRanges: SortedRanges.ofSortedRanges([]),
};

export namespace CoarseHierarchy {
    export const Empty: CoarseHierarchy = {
        isDefined: false,
        spheres: EmptyCoarseElements,
        gaussians: EmptyCoarseElements
    };
}
loadCheckpoint(`mol-model/structure/model/properties/coarse/hierarchy.ts::end`);
