import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
    type ThemeType = typeof theme; // pego o tipo e dou um nome e copio com typeof a mesma tipagem de theme

    export interface DefaultTheme extends ThemeType {} // Aqui devolvo ele extendido
}