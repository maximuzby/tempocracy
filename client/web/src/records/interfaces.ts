import { Instance, SnapshotOut } from 'mobx-state-tree';
import { recordStore } from './stores';

export interface IRecord extends Instance<typeof recordStore> {}

export interface IRecordModel extends SnapshotOut<typeof recordStore> {}
