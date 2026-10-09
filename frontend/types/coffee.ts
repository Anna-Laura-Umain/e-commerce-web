import { SharedProduct } from './sharedProduct';

export type Coffee = SharedProduct & {
    _type?: 'coffee';
    roastLevel: string;
}
