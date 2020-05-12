import { Page } from '../types'
import _ from 'lodash';

export let unpage = <T>(pages: Page<T>[]) =>
    pages
        .flatMap(page => page.results)
        .filter(x => !!x);