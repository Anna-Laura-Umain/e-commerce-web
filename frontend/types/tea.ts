import { SharedProduct } from './sharedProduct';

export type Tea = SharedProduct & {
    _type?: 'tea';
    oxidationLevel: string;
    teaType: string;
};
