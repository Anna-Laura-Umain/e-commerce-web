import { SharedProduct } from './sharedProduct';

export type Tea = SharedProduct & {
    oxidationLevel: string;
    teaType: string;
};
