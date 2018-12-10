import { Instance, SnapshotOut } from 'mobx-state-tree';
import { recordListStore } from './record-list-store';
import { recordStore } from './record-store';

export interface RecordListStore extends Instance<typeof recordListStore> {}

export interface RecordList extends SnapshotOut<typeof recordListStore> {}

export interface RecordStore extends Instance<typeof recordStore> {}

export interface Record extends SnapshotOut<typeof recordStore> {}
