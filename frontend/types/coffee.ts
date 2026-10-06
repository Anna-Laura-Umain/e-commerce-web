import { SharedProduct } from './sharedProduct';

export type Coffee = SharedProduct & {
    roastLevel: string;
}
